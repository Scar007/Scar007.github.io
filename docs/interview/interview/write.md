## 手写
- new<br>
```js
function _new(fn) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let res = fn.call(obj)
  return typeof res === 'object' ? res : obj
}
```

- call、apply、bind<br>
call:
```js
Function.prototype._call = function(context, ...args) {
  context = context ||  window;
  context.fn = this;
  let result = context.fn(...args)
  delete context.fn
  return result
}
```
apply:
```js
Function.prototype._apply = function(context, arr) {
  context = context || window;
  context.fn = this;
  let result = arr ? context.fn(...arr) : context.fn()
  delete context.fn
  return result
}
```
bind:
```js
Function.prototype._bind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('this is not a funtion')
  }
  let self = this
  let fn = function(){}
  let bound = function(...newArgs) {
    self.call(context, ...args, ...newArgs)
  }
  fn.prototype = self.prototype
  bound.prototype = new fn()
  return bound
}
```
- async/await

- 数组排序，时间复杂度是多少<br>
冒泡：
```js
funtion bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        let change = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = change
        j--
      }
    }
  }
  return arr
}
```
快排：
```js
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let left = []
  let right = []
  let centerIndex = Math.floor(arr.length / 2)
  let center = arr.splice(centerIndex, 1)
  for(let i = 0; i < arr.length; i++) {
    arr[i] < center ? left.push(arr[i]) : right.push(arr[i])
  } 
  return quickSort(left).concat(center, quickSort(right))
}
```
插入：
```js
funtion insertSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    let current = arr[i]
    let j = i - 1
    while(arr[j] > current) {
      arr[j+1] = arr[j]
      j--
    }
    arr[j+1] = current
  }
  return arr
}
```

- 数组去重(...)
  - [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), { a: 1}, { a: 1 }, /a/, /a/, NaN, NaN]去重，输出[1, '1', null, undefined, new String('1'), { a: 1}, /a/, NaN];
```js
function unique(arr) {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}
```

- 多维数组扁平化<br>
flat：
```js
arr.flat(Infinity)
```
递归：
```js
function flatten(arr) {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
```
toString:
```js
funtion flatten() {
  return arr.toString().split(',').map(item => Number(item))
}
```
join:
```js
function flatten() {
  return arr.join().split(',').map(item => Number(item))
}
```
reduce:
```js
function flatten(arr) {
  return arr.reduce((item1, item2)=> {
    return item1.concat(Array.isArray(item2) ? flatten(item2): item2)
  }, [])
}
```

- instanceOf
- 节流、防抖
防抖：
```js
function debounce(fn, delay) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
```
节流：
```js
function throttle(fn, delay) {
  let flag = false
  return function() {
    if (!flag) {
      flag = true
      setTimeout(() => {
        flag = false
        fn.apply(this, arguments)
      }, delay)
    }
  }
}
```

- 实现promise、promise.all、promise.race
promise:
```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class myPromise {
  constructor(executor) {
    this.state = PENDING
    this.value = null
    this.reason = null
    this.resolveCallback = []
    this.rejectCallback = []
    
    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULLFILLED
        this.value = value
        this.resolveCallback.forEach(cb => cb())
      }
    }

    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.rejectCallback.forEach(cb => cb())
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFullfilled, onRejected) {
    if (this.state === FULLFILLED) {
      onFullfilled(this.value)
    }
    if (this.state === REJECTED) {
      onRejected(this.reason)
    }
    if (this.state === PENDING) {
      this.resolveCallback.push(() => {
        onFullfilled(this.value)
      })
      this.rejectCallback.push(() => {
        onRejected(this.reason)
      })
    }
  }

  all(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('arguments is not an array')
    }
    let result = []
    let count = 0
    return new myPromise((resolve, reject) => {
      for(let i = 0; i < arr.length; i++) {
        myPromise.resolve(arr[i]).then((data) => {
            result[i] = (data)
            if (count++ === arr.length) {
              return resolve(result)
            }
        }, (e) => {
          return reject(e)
        })
      }
    })
  }

  race(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('arguments is not an array')
    }

    return new MyPromise((resolve, reject) => {
      for(let i = 0; i < arr.length; i++) {
        MyPromise.resolve(arr[i]).then(resolve, reject)
      }
    })
  }
}
```

- 实现Events对象，包含on、emit、once方法(发布订阅)
```js
class Events {
  constructor() {
    this.eventStore = {}
  }

  on(eventName, cb) {
    if (this.eventStore[eventName]) {
      this.eventStore[eventName].push(cb)
    } else {
      this.eventStore[eventName] = [cb]
    }
  }

  emit(eventName, ...args) {
    if (this.eventStore[eventName]) {
      this.eventStore[eventName].forEach(cb => cb(...args))
    }
  }

  off(eventName, cb) {
    if (this.eventStore[eventName]) {
      if (cb) {
        this.eventStore[eventName] = this.eventStore[eventName].filter(item => item !== cb)
      } else {
        delete this.eventStore[eventName]
      }
    }
  }

  once(eventName, cb) {
    let onceFn = (...args) => {
      cb.call(...args)
      Events.off(eventName, onceFn)
    }
    Events.on(eventName, onceFn)
  }
}
```

- 翻转DOM子节点
```js
function reverseDom(node) {
  let frag = node.ownerDocument.createDocumentFragment()
  while(node.lastChild) {
    frag.appendChild(node.lastChild)
  }
  node.appendChild(frag)
}
```

- 深拷贝
```js
function deepCopy(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let newObj = {}
  for(let key in obj) {
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}
```

- 浅拷贝
```js
Object.assign({}, obj)
```

- 大数相加
```js
function add(num1, num2) {
  let i = num1.length - 1
  let j = num2.length - 1
  let carry = 0
  let arr = []
  while(i >= 0 || j >= 0 || carry > 0) {
    let n1 = i >= 0 ? Number(num1.charAt(i)) : 0
    let n2 = j >= 0 ? Number(num2.charAt(j)) : 0
    let sum = n1 + n2 + carry
    arr.unshift(sum % 10)
    carry = Math.floor(sum / 10)
    i--
    j--
  }
  return arr.join('')
}
```

- 链表翻转
```js
function reverseList(head) {
  let current = head
  let prev = null
  while(current) {
    let next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}
```

- 数组的isArray



- 计算1+2+3+4+5...n之和
  > 考察等差数列相加<br>
reduce：
```js
function add(arr) {
  return arr.reduce((item1, item2) => {
    return item1 + item2
  }, 0)
}
```
for、forEach等
```js
function add(arr) {
  let sum = 0
  for(let i = 0; i < arr.length; i++) {
    sum+=arr[i]
  }
  return sum
}
```

- 找出数组里边a, b, c三个相加等于0的选项，且不能重复。
  ```js
  输入：[1, 3, -3, -1, 0, 5, -2, 0, -3]
  输出：[[3, -3, 0], [1, -1, 0], [-2, -3, 5]]
  ```
```js
function threeSum(arr) {
  if (arr.length < 3) return []
  arr.sort((a, b) => a - b)
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i-1]) continue
    if ((arr[0] + arr[1] + arr[2]) > 0) return
    if ((arr[arr.length-1] + arr[arr.length - 2] + arr[arr.length - 3]) < 0) return
    let LIndex = i + 1
    let RIndex = arr.length - 1
    while(LIndex < RIndex){
      let count = arr[i] + arr[LIndex] + arr[RIndex]
      if (count === 0) {
        result.push([arr[i], arr[LIndex], arr[RIndex]])
        while ((LIndex < RIndex) && (arr[LIndex] === arr[LIndex+1])) LIndex++
        while ((LIndex < RIndex) && (arr[RIndex] === arr[RIndex-1])) RIndex--
        LIndex++
        RIndex--
      } else if (count < 0) {
        LIndex++
      } else if (count > 0) {
        RIndex--
      }
    }
  }
  return result
}
```

- 找出所有项里边最长的共同前缀，没有的话返回''
  ```js
  输入：['flower', 'flow', 'flexible']
  输出：'fl'
  ```
```js
function longestStr(strs) {
  if (strs.length === 0) return ''
  let str1 = strs[0]
  for(let i = 0; i < strs.length; i++) {
    for(let j = 0; j < strs[i].length; j++) {
      if (str1[j] !== strs[j]) break
      str1 = strs.substr(0, j)
      if (str1 === '') return str1
    }
  } 
  return str1
}
```
```js
function longStr(arr) {
  if (!arr || arr.length === 0) return ''
  let str = arr[0]
  let res = ''
  for(let i = 0; i < str.length; i++) {
    let flag = arr.eveny(item => item[i] === str[i])
    if (flag) {
      res += str[i]
    } else {
      return res
    }
  }
  return res
}
```

- www.baidu.com.cn => cn.com.baidu.www 字符串翻转
```js
```


- 寻找⼀个整数N，满⾜N%2 === 1， N%3 === 2，N%4 === 3，N%5 === 4， N%6 === 5，N%7 === 0 （不要暴⼒遍历）


- 已知⼀个数组由整数构成，请找出数组中最⼤的10项。

- 已知有两个单向链表，判断两个链表是否会相交。

- 给定数组['1a', '2b', '3c', '5a']，输出出现字母最多的前数字之和

- 给定任意二维数组，输出所有排列组合项。比如[['a', 'b'], ['A', 'B'], [1, 2]]，输出['aA1', 'aA2', 'bB1', 'bB2', 'bA1', 'bA2', 'bB1', 'bB2']

- 柯里化函数add(1)(2)(3)

- 数组对象操作
  ```js
  const a = [
    { name: xx1, age: 8，city: BJ },
    { name: xx2, age: 12, city: HK}
    .....
  ]

  const b = [
    { name: yy1, age: 3, city: USA },
    { name: yy2, age: 8, city: JP}
    .....
  ]
  ```
  - 如果想要整合数据，返回a与b年龄⼤于8的所有字段
  - 如何想要整合数据，按照年龄统计名字，即 8岁的有xx1, yy2
  - 编写⼀个函数，根据过滤条件返回集合，过滤规则以及如何解析都由⾃⼰来设计。例:function findData(maxAge: 8)
- 给定⼀个符合JavaScript对象取值的字符串，得到路径数组（可以考虑正则、AST、Proxy） ⽰例如下： 
  ```js
  const source = "a[0].b['cd'].e"; getPath(source); ['a', '0', 'b', 'cd', 'e']
  ```
- 给定输入一个字符串，包含{}[]以及其他字符，确认字符串的括号是否是成对出现，如'&#123;&#123;&#123;&#123;1231[23{]}}}}[[}}'
  ```js
  function check(str) {
    let arr = str.match(/\{|\}|\[|\]/g);
    if (arr.length % 2 !== 0) return false;
    let resArr = [];
    for (let i = 0; i < arr.length; i++) {
      let cur = arr[i];
      let prev = resArr[resArr.length - 1];
      resArr.push(cur);
      if (prev && ((prev === "{" && cur === "}") || (prev === "[" && cur === "]"))) {
        resArr.length = resArr.length - 2;
      }    
    }
    return resArr.length === 0;
  }

  console.log(check('{}asdasd{{[]}}'))
  console.log(check('{}asdasd{{[]}}{'))
  console.log(check('{}asdasd{{['))
  ```
- 实现函数：统计当前页面所有使用的标签中出现频率TOP 1
  ```js
  function getTags() {
    const eles = document.getElementsByTagName('*');
    let max = 0;
    let maxTag = '';
    let tags = [];
    let info = {};
    for(let i = 0; i < eles.length; i++) {
      let e = eles[i].tagName;
      if (info[e]) {
        info[e] += 1;
        if (info[e] > max) {
          tags = [e]
          max = info[e];
          maxTag = e;
        }
        if (info[e] === max && e !== maxTag) {
          tags.push(e);
        }
      } else {
        info[e] = 1;
      }
    }
    return tags;
  }
  console.log(getTags());
  ```

- 实现一个函数查找与之关联的元素，可能是网状结构？不用递归怎么实现？循环引用怎么处理？
  ```javascript
  Node: {name: 'a', next: [Node, Node, Node]}
  findChildren(Node): Node[]
  ```

- 算法：输入[1,2,3,4] 输出所有的不重复的三位数，如 123， 124，134，213...
- 函数输出以数字十位数升序排序
  ```javascript
  const arr = [ 138, 26, 9, 81, 314, 222 ];

  foo(arr) // [ 9, 314, 26, 222, 138, 81 ]
  ```
  ```javascript
  function getMid(num) {
    return Math.floor(num / 10) % 10
  }

  function foo(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let flag = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (getMid(arr[j]) > getMid(arr[j + 1])) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          flag = true;
        }
        if (!flag) {
          break;
        }
      }
    }
    return arr;
  }

  console.log(foo([ 138, 26, 9, 81, 314, 222 ]));
  ```
  > 其实就是考排序算法，记住常用的几种排序：冒泡、快排、插入。

- 实现一个函数 makeSum 传入的参数个数，达到的时候输出所有传入参数的和，像下面这样
  ```javascript
  const foo = makeSum(3);

  foo(1,2,3) // 6
  foo(1)(2,3) // 6
  foo(1)(2)(3) // 6
  ```
  ```javascript
  function makeSum(n) {
      let params = [];
      function fn(...arg) {
          params = params.concat(arg);
          if (params.length >= 3) {
              params.length = 3;
              return params.reduce((item, prev) => item + prev, 0)
          }
          if (params.length < 3) {
              return fn
          }
      }
      return fn;
  }
  console.log(foo(1,2,3)) // 6
  console.log(foo(1)(2,3)) // 6
  console.log(foo(1)(2)(3)) // 6
  ```

- 找出给定数组中缺失的数字，如 [4,6,8,3,7] 输出 5
```js
function missNum(arr) {
  let L = 0;
  let R = arr.length - 1
  while(L <= R) {
    let mid = Math.floor((L + R) / 2)
    if (mid === nums[mid]) {
      L++
    } else if (mid < nums[mid]) {
      R--
    }
  }
  return L
}
```

- 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
  ```js
  示例 1:
  输入: "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  示例 2:
  输入: "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

  示例 3:
  输入: "pwwkew"

  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
  ```
  思路：遇到重复的，摒弃前边的，向后拼接
  ```js
  function longStr(str) {
    let temp = ''
    let max = 0
    for(let i = 0; i < str.length; i++) {
      if (temp.indexOf(str[i]) === -1) {
        temp += str[i]
      } else {
        temp = temp.slice(temp.indexOf(str[i]))
        temp += str[i]
      }
      max = Math.max(max, temp.length)
    }
    return max
  }
  ```

- 实现genrator函数的co执行器，类似async函数自动执行的效果，而不需手动调用next()
```js
function co(generator) {
  return new Promise((resolve, reject) => {
    const gen = genetator();
    function next(...args) {
      let tmp = gen.next(...args);
      if (tem.done) {
        return resolve(tmp.value)
      } else {
        // tem.value.then((...rec) => {
        //   next(...ret)
        // })
        return Promise.resolve(value).then(() => {
          next(value)
        })
      }
    }
    next()
  })
}

function co(generator) {
  return new Promise((resolve, reject) => {

    
  })
}
```

- 不用循环，创建一个1-100的数组，并且每个元素的值等于它的下标
- 超时请求
  ```js
  // fetch 是新的请求接口方法. 如: 获取user我们可以像下面这样调用:
  fetch('/user').then(user => {})
  // 请将fetch封装为一个函数xFetch, 让fetch 支持超时后返回,超时异常
  // 如
  xFetch('/user', {timeout: 3000}).catch(err => {
    if(err.code == -1) {
      console.log('请求超时')
    }
  });

  function xFetch() {
    //todo
  }
  ```
- 假设本地机器无法做加减乘除法，需要通过远程请求让服务端来实现。
  ```js
  // 以加法为例，现有远程API的模拟实现
  const addRemote = async (a, b) => new Promise(resolve => {
    setTimeout(() => resolve(a + b), 1000)
  })

  // 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
  async function add(...inputs) {
    // 你的实现
  }

  // 请用示例验证运行结果:
  add(1, 2)
    .then(result => {
      console.log(result) // 3
    })

  add(3, 5, 2)
    .then(result => {
      console.log(result) // 10
    })
  ```
- 将A数组转换为B数组的样子
  ```js
  var A = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'a'}]

  var B = [[{id: 1, name: 'a'}, {id: 3, name: 'a'}], [{id: 2, name: 'b'}]]
  ```
- 每隔1秒发一次请求接口，次数达到6次或者后端返回res.complete == true停止；前端接收后端数据以最新的为主，例如第一次请求的返回数据res1比第二次请求的res2晚，只使用res2；数据接口可以用 fetch('/getData'）模拟
-  传入一个数，将这个数拆成最多个数相乘的数组
  ```js
  8 --> [2, 2, 2]
  30 ---> [2, 3, 5]
  ```
- 实现一个方法，具备以下能力:
  - 支持全局配置能力，全局配置能配置请求分类以及请求分类的优先级，配置baseUrl，headers选项
  - 同时发送请求只能有6个
  - 能控制请求的优先级，优先级高的请求先发起
- 将["a", "abc", "ab", "aa", "aa"] 按照字符串长度逆序排序，长度相同，按字符串ASCII码顺序排序
  ```js
  输入：["a", "abc", "ab", "aa", "aa"]
  输出：['abc', 'aa', 'aa', 'ab', 'a']
  ```
  ```js
  function fn(arr) {
    arr.sort((a,b) => {
      if (a.length != b.length) {
        return b.length - a.length
      } else {
        return a.charAt(a) < b.charAt(b) ? -1 : 1
      }
    })
  }
  ```

- 打印结果
  ```js
  console.log('script start')

  async function async1() {
  await async2()
  console.log('async1 end')
  }
  async function async2() {
  console.log('async2 end')
  return Promise.resolve().then(()=>{
    console.log('async2 end1')
  })
  }
  async1()

  setTimeout(function() {
  console.log('setTimeout')
  }, 0)

  new Promise(resolve => {
  console.log('Promise')
  resolve()
  })
  .then(function() {
  console.log('promise1')
  })
  .then(function() {
  console.log('promise2')
  })

  console.log('script end')
  ```

- 斐波那契数列
```js
function fib(n) {
  let n1 = 0;
  let n2 = 1;
  for(let i = 0; i < n; i++) {
    let sum = (n1+n2) % 1000000007
    n1 = n2
    n2 = sum
  }
  return n1
}
```
- 跳台阶
```js
function jump(n) {
  if (!n || n === 1) return 1
  let n1 = 0
  let n2 = 1
  for(let i = 0; i < n; i++) {
    let sum = (n1 + n2) % 1000000007
    n1 = n2
    n2 = sum    
  }
  return sum
}
```
