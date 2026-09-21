---
publish: false
title: 实现async await
createTime: 2021/03/11 20:46:22
permalink: /blog/rsm804u7/
---
[async/await 原理及执行顺序分析](https://juejin.cn/post/6844903988584775693)
[async、await 实现原理](https://zhuanlan.zhihu.com/p/115112361)

### 思想一
```JavaScript
function asyncToGen(genFunction) {
  // 返回的是一个新的函数
  return function (...args) {
    // 先调用generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = genFunction.apply(this, args);
    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let genResult;
        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          genResult = gen[key](arg);
        } catch (err) {
          return reject(err);
        }
        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = genResult;
        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next() 
            //
            //      // 此时done为true了 整个promise被resolve了 
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            (val) => {
              step('next', val);
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            (err) => {
              step('throw', err);
            },
          );
        }
      }
      step('next');
    });
  };
}
const getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000));
function* testG() {
  const data = yield getData();
  console.log('data: ', data);
  const data2 = yield getData();
  console.log('data2: ', data2);
  return 'success';
}

const gen = asyncToGen(testG);
gen().then(res => console.log(res));
```

### 思想二
本质是希望实现一个co函数
```JavaScript
let delay = function (time, fnc) {
	setTimeout(() => {
		fnc(time);
	}, time);
}

let promisefy = (fn) => {
	return (...arg) => {
		return new Promise ((resolve, reject)=> {
			fn(...arg, (param)=>{
				resolve(param);
			})
		});
	}
}

let delayP = promisefy(delay);

const gen = function* () {
	const ret1 = yield delayP(1000);
	console.log(ret1);
	const ret2 = yield delayP(2000);
	console.log(ret2);
}

// 阴间写法
const g = gen();
g.next().value.then((res1)=>{
	g.next(res1).value.then((res2)=>{
		//
	});
})


// 正常写法
function co (generator) {
	return new Promise((resolve, reject)=>{
		const gen = generator();
		function next (...param) {
			let tmp = gen.next(...param);
			if (tmp.done) {
				resolve(tmp.value);
				return;
			}
			tmp.value.then((...ret)=>{
				next(...ret);
			})
		}
		next();
	})
}

co(gen).then((res)=>{
    console.log(res);
})
```

[其他题目](https://github.com/Linjiayu6/LeetCode/issues/9)

