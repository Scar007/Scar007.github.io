---
publish: false
title: 中间件
---
## koa中间件实现源码
```js
// 注意其中的compose函数，这个函数是实现中间件洋葱模型的关键
// 场景模拟
// 异步 promise 模拟
const delay = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
// 中间间模拟
const fn1 = async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
}
const fn2 = async (ctx, next) => {
  console.log(3);
  await delay();
  await next();
  console.log(4);
}
const fn3 = async (ctx, next) => {
  console.log(5);
}

const middlewares = [fn1, fn2, fn3];

// compose 实现洋葱模型
const compose = (middlewares, ctx) => {
  const dispatch = (i) => {
    let fn = middlewares[i];
    if(!fn){ return Promise.resolve() }
    return Promise.resolve(fn(ctx, () => {
      return dispatch(i+1);
    }));
  }
  return dispatch(0);
}

compose(middlewares, 1);
```
