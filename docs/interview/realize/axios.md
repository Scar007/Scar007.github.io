---
title: 实现axios
---
axios 是目前最常用的 http 请求库，可以用于浏览器和 node.js 。

axios 的主要特性包括：
- 基于 Promise
- 支持浏览器和 node.js
- 可拦截请求与响应
- 可转换请求与响应数据
- 请求可以取消
- 自动转换 JSON 数据
- 客户端支持防范 XSRF
- 支持各主流浏览器及 IE8+

> 这里所说的 支持浏览器和 node.js ，是指 axios 会自动判断当前所处的环境
> - 如果是浏览器，就会基于 XMLHttpRequests 实现 axios
> - 如果是 node.js 环境，就会基于 node 内置核心模块http 实现 axios

### axios 使用
#### 发送请求
```JavaScript
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```
这是一个官方示例。从上面的代码中可以看到，axios 的用法与 jQuery 的 ajax 方法非常类似，两者都返回一个 Promise 对象（在这里也可以使用成功回调函数，但还是更推荐使用 Promise 或 await），然后再进行后续操作。

#### 添加拦截器函数
```JavaScript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```
从上面的代码，我们可以知道：发送请求之前，我们可以对请求的配置参数（ config ）做处理；在请求得到响应之后，我们可以对返回数据做处理。当请求或响应失败时，我们还能指定对应的错误处理函数。

#### 撤销 HTTP 请求
在开发与搜索相关的模块时，我们经常要频繁地发送数据查询请求。一般来说，当我们发送下一个请求时，需要撤销上个请求。因此，能撤销相关请求功能非常有用。axios 撤销请求的示例代码如下：
```JavaScript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/api/user', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('请求撤销了', thrown.message);
  } else {
  }
});

axios.post('/api/user', {
  name: 'pingzi'
}, {
  cancelToken: source.token
}).

source.cancel('用户撤销了请求');
```
<img src='https://camo.githubusercontent.com/a2e7bf5f6a85d8e96c85c49b2ce0694448a844ec139d879b24961a82a6c0fc04/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f3230323030393230323235363039'>

#### 源码分析
API	| 类型
--- | --
axios(config) |	发送请求
axios.create(config) |	创建请求
axios.request(get post delete …) | 创建请求别名
axios.default |	默认 config 配置
axios.interceptors | 拦截器
axios.all() / axios.spread | 并行请求
axios.Cancel() / axios.CancelToken() / axios.isCancel() | 取消请求


#### 1. 首先，先看看入口是怎么实现的:
```JavaScript
"use strict";

var utils = require("./utils");
var bind = require("./helpers/bind");
var Axios = require("./core/Axios");
var mergeConfig = require("./core/mergeConfig");
var defaults = require("./defaults");

/**
 * 创建Axios实例
 */
function createInstance(defaultConfig) {
  // new Axios 得到一个上下文环境 包含defatults配置以及拦截器
  var context = new Axios(defaultConfig);

  // instance实例为bind返回的一个函数(即是request发送请求方法)，此时this绑定到context上下文环境
  var instance = bind(Axios.prototype.request, context);
  // 将Axios构造函数中的原型方法绑定到instance上并且指定this作用域为context上下文环境
  utils.extend(instance, Axios.prototype, context);
  // 把上下文环境中的defaults 以及拦截器绑定到instance实例中
  utils.extend(instance, context);

  return instance;
}

// axios入口其实就是一个创建好的实例
var axios = createInstance(defaults);
// 这句没太理解，根据作者的注释是：暴露Axios类去让类去继承
axios.Axios = Axios;

// 工厂函数 根据配置创建新的实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// 绑定取消请求相关方法到入口对象
axios.Cancel = require("./cancel/Cancel");
axios.CancelToken = require("./cancel/CancelToken");
axios.isCancel = require("./cancel/isCancel");

// all 和 spread 两个处理并行的静态方法
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require("./helpers/spread");

module.exports = axios;

// 允许使用Ts 中的 default import 语法
module.exports.default = axios;
```
axios 入口其实就是通过 createInstance 创建出的实例和 axios.create() 创建出的实例一样。而源码入口中的重中之中就是 createInstance 这个方法。createInstance 流程大致为:

1. 使用 Axios 函数创建上下文 context ，包含自己的 defaults config 和 管理拦截器的数组
2. 利用 Axios.prototype.request 和 上下文创建实例 instance，实例为一个 request 发送请求的函数 this 指向上下文 context
3. 绑定 Axios.prototype 的其他方法到 instance 实例，this 指向上下文 context
4. 把上下文 context 中的 defaults 和拦截器绑定到 instance 实例

#### 2. 请求别名
在 axios 中 axios.get 、axios.delete 、axios.head 等别名请求方法其实都是指向同一个方法 axios.request 只是把 default config 中的 请求 methods 进行了修改而已。 具体代码在 Axios 这个构造函数的原型上，让我们来看下源码的实现：
```JavaScript
utils.forEach(
  ["delete", "get", "head", "options"],
  function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(
        utils.merge(config || {}, {
          method: method,
          url: url
        })
      );
    };
  }
);

utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(
      utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      })
    );
  };
});
```
因为 post 、 put 、 patch 有请求体,所以要分开进行处理。请求别名方便用户快速使用各种不同 API 进行请求。

#### 3. 拦截器的实现
首先在我们创建实例中，会去创建上下文实例 也就是 new Axios ，会得到 interceptors 这个属性,这个属性分别又有 request 和 response 两个属性 ， 它们的值分别是 new InterceptorManager 构造函数返回的数组。这个构造函数同样负责拦截器数组的添加和移除。让我们看下源码:
```JavaScript
"use strict";

var utils = require("./../utils");

function InterceptorManager() {
  this.handlers = [];
}

// axio或实例上调用 interceptors.request.use 或者 interceptors.resopnse.use
// 传入的resolve, reject 将被添加入数组尾部
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
// 移除拦截器，将该项在数组中置成null
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

// 辅助方法，帮助便利拦截器数组，跳过被eject置成null的项
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
```
上下文环境有了拦截器的数组， 又如何去 做到多个拦截器请求到响应的顺序处理以及实现呢？为了了解这点我们还需要进一步往下看 Axios.protoType.request 方法。

#### 5. Axios.protoType.request
Axios.protoType.request 方法是请求开始的入口，分别处理了请求的 config ，以及链式处理请求拦截器 、请求、响应拦截器,并返回 Proimse 的格式方便我们处理回调。让我们来看下源码部分：
```JavaScript
Axios.prototype.request = function request(config) {
  //判断参数类型，支持axios('url',{})以及axios(config)两种形式
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  //传入参数与axios或实例下的defaults属性合并
  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : "get";

  // 创造一个请求序列数组，第一位是发送请求的方法,第二位是空
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  //把实例中的拦请求截器数组依从加入头部
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  //把实例中的拦截器数组依从加入尾部
  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  //遍历请求序列数组形成prmise链依次处理并且处理完弹出请求序列数组
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  //返回最终promise对象
  return promise;
};
```
我们可以看到 Axios.protoType.request 中使用了精妙的封装方法，形成 promise 链 去依次挂载在 then 方法顺序处理。


#### 6. 取消请求
Axios.prototype.request 调用 dispatchRequest 是最终处理 axios 发起请求的函数，执行过程流程包括了：
1. 取消请求的处理和判断
2. 处理 参数和默认参数
3. 使用相对应的环境 adapter 发送请求(浏览器环境使用 XMLRequest 对象、Node 使用 http 对象)
4. 返回后抛出取消请求 message，根据配置 transformData 转换 响应数据

这一过程除了取消请求的处理， 其余的流程都相对十分的简单，所以我们要对取消请求进行详细的分析。我们还是先看调用方式:
```JavaScript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token
  })
  .catch(function(thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

source.cancel("Operation canceled by the user.");
```
从调用方式我们可以看到，我们需要从 config 传入 axios.CancelToken.source().token , 并且可以用 axios.CancelToken.source().cancel() 执行取消请求。我们还可以从 看出 canel 函数不仅是取消了请求，并且 使得整个请求走入了 rejected 。从整个 API 设计我们就可以看出这块的 功能可能有点复杂， 让我们一点点来分析,从 CancelToken.source 这个方法看实现过程 ：
```JavaScript
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};
```
axios.CancelToken.source().token 返回的是一个 new CancelToken 的实例，axios.CancelToken.source().cancel , 是 new CancelToken 是传入 new CancelToken 中的方法的一个参数。再看下 CancelToken 这个构造函数：
```JavaScript
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
```
我们根据构造函数可以知道 axios.CancelToken.source().token 最终拿到的实例下挂载了 promise 和 reason 两个属性，promise 属性是一个处于 pending 状态的 promise 实例，reason 是执行 cancel 方法后传入的 message 。而 axios.CancelToken.source().cancel 是一个函数方法，负责判断是否执行，若未执行拿到 axios.CancelToken.source().token.promise 中 executor 的 resolve 参数，作为触发器，触发处于处于 pending 状态中的 promise 并且 传入的 message 挂载在 axios.CancelToken.source().token.reason 下。若有 已经挂载在 reason 下则返回防止反复触发。而这个 pending 状态的 promise 在 cancel 后又是怎么进入 axios 总体 promise 的 rejected 中呢。我们需要看看 adpater 中的处理：
```JavaScript
//如果有cancelToken
if (config.cancelToken) {
  config.cancelToken.promise.then(function onCanceled(cancel) {
    if (!request) {
      return;
    }
    //取消请求
    request.abort();
    //axios的promise进入rejected
    reject(cancel);
    // 清楚request请求对象
    request = null;
  });
}
```

取消请求的总体逻辑大体如此，可能理解起来比较困难，需要反复看源码感受内部的流程，让我们大致在屡一下大致流程：
- axios.CancelToken.source() 返回一个对象，tokens 属性 CancelToken 类的实例，cancel 是 tokens 内部 promise 的 reslove 触发器
- axios 的 config 接受了 CancelToken 类的实例
- 当 cancel 触发处于 pending 中的 tokens.promise ，取消请求，把 axios 的 promise 走向 rejected 状态

### 手写 axios
看完了源码分析，下面手写一个 axios 就很容易了

```JavaScript
/ util.js
// 将一个对象的方法和属性扩展到另外一个对象上，并指定上下文
function extend(a,b, context) {
    for(let key in b) {
        if (b.hasOwnProperty(key)) {
            if (typeof b[key] === 'function') {
                a[key] = b[key].bind(context);
            } else {
                a[key] = b[key]
            }
        }
    }
}

//深拷贝
function deepClone (source) {
	let target = Array.isArray(source) ? [] : {};

	for ( let key in source ) {
		if ( typeof source[key] === 'object' && source[key] !== null ) {
			target[key] = deepClone(source[key])
		} else {
			target[key] = source[key]
		}
	}
	return target
}

//合并
function mergeConfig (obj1, obj2) {
	let target = deepClone(obj1),
		source = deepClone(obj2);

	return Object.keys(source).reduce((t,k)=>{
		if(['url','baseURL','method'].includes(k)){
			t[k] = source[k]
		}
		if(['headers','data','params'].includes(k)){
			t[k] = Object.assign({},source[k],t[k])
		}
		return t;
	},target)
}
export {
	extend,
	deepClone,
	mergeConfig,
};
```

```JavaScript
import util from './utils'

// 拦截器
class InterceptorsManage {
    constructor() {
        this.handlers = []
    }

    use(fullfield, rejected) {
        this.handlers.push({
            fullfield,
            rejected
        })
        return this.handlers.length - 1
    }
}

class Axios {
    constructor(defaultConfig) {
        this.defaultConfig = util.deepClone(defaultConfig)
        this.interceptors = {
            request: new InterceptorsManage(),
            response: new InterceptorsManage()
        }
    }

    request(config) {
        // 配置合并
		let configs = util.mergeConfig(this.defaults, config)
        
        // 拦截器和请求组装队列
        let chain = [this.sendAjax.bind(this), undefined] // 成对出现的，失败回调暂时不处理

        // 请求拦截
        this.interceptors.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fullfield, interceptor.rejected)
        })

        // 响应拦截
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fullfield, interceptor.rejected)
        })

        // 执行队列，每次执行一对，并给promise赋最新的值
        let promise = Promise.resolve(configs)
        while(chain.length) {
            // config 会按序通过 
            // 不断将config从上一个promise传递到下一个promise
            promise = promise.then(chain.shift(), chain.shift())
        }
        return promise
    }
    
    sendAjax(config){
        return new Promise(resolve => {
            const {url = '', method = 'get', data = {}} = config
            // 发送ajax请求
            const xhr = new XMLHttpRequest()
            xhr.open(method, url, true)
            xhr.onload = function() {
                resolve(xhr.responseText)
            };
            xhr.send(data)
        })
    }
}

// 定义get,post...方法，挂在到 Axios 原型上
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach(met => {
    Axios.prototype[met] = function() {
        // 处理单个方法
        if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url[, config])
            return this.request({
                method: met,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else { // 3个参数(url[,data[,config]])
            return this.request({
                method: met,
                url: arguments[0],
                data: arguments[1] || {},
                ...arguments[2] || {}
            })
        }

    }
})

// 最终导出axios的方法 -》即实例的request方法
function createInstance(defaultConfig) {
    // 创建一个 Axios 实例
    let context = new Axios(defaultConfig)
    // 指定上下文
    let instance = Axios.prototype.request.bind(context)
    // 把Axios.prototype上的方法扩展到instance对象上，
    // 这样 instance 就有了 get、post、put等方法
    // 并指定上下文为context，这样执行Axios原型链上的方法时，this会指向context
    util.extend(instance, Axios.prototype, context)
    // 把context对象上的自身属性和方法扩展到instance上
    // 注：因为extend内部使用的forEach方法对对象做for in 遍历时，只遍历对象本身的属性，而不会遍历原型链上的属性
    // 这样，instance 就有了  defaults、interceptors 属性。（这两个属性后面我们会介绍）
    util.extend(instance, context)
    return req
}

// 得到最后的全局变量 axios
let axios = createInstance(defaultConfig)
```


#### 常见面试题集锦
- 问：为什么 axios 既可以当函数调用，也可以当对象使用，比如axios({})、axios.get

答：axios本质是函数，赋值了一些别名方法，比如get、post方法，可被调用，最终调用的还是Axios.prototype.request函数。

- 有用过拦截器吗？原理是怎样的

答：用过，用axios.interceptors.request.use添加请求成功和失败拦截器函数，用axios.interceptors.response.use添加响应成功和失败拦截器函数。在Axios.prototype.request函数组成promise链式调用时，Interceptors.protype.forEach遍历请求和响应拦截器添加到真正发送请求dispatchRequest的两端，从而做到请求前拦截和响应后拦截。拦截器也支持用Interceptors.protype.eject方法移除

- 有使用axios的取消功能吗？是怎么实现的

答：用过，通过传递config配置cancelToken的形式，来取消的。判断有传cancelToken，在promise链式调用的dispatchRequest抛出错误，在adapter中request.abort()取消请求，使promise走向rejected，被用户捕获取消信息

- 为什么支持浏览器中发送请求也支持node发送请求

答：axios.defaults.adapter默认配置中根据环境判断是浏览器还是node环境，使用对应的适配器。适配器支持自定义



#### 其他链接
- [深入浅出axios源码(知乎)](https://zhuanlan.zhihu.com/p/37962469)
- [如何写一个像 axios 那样优秀的请求库
](https://mp.weixin.qq.com/s/d3Or96bd5LesUl9OR8Ca4g)
- [axios —— 极简封装的艺术](https://zhuanlan.zhihu.com/p/28396592)
- [学习 axios 源码整体架构，打造属于自己的请求库](https://zhuanlan.zhihu.com/p/97813399)
- [手写axios核心原理，再也不怕面试官问我axios原理](https://juejin.cn/post/6856706569263677447)


