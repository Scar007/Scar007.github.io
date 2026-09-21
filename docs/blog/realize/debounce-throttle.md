---
publish: false
title: 防抖和节流
createTime: 2021/03/03 22:08:36
permalink: /blog/9gv55yzl/
---
## 防抖 和 节流 的区别是什么？防抖和节流的怎么实现。
防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于设置的时间，防抖的情况下只会调用一次，而节流的情况会每隔一段时间调用一次函数。

### 防抖
<strong>防抖(debounce):</strong>将多次高频操作优化为只在最后一次执行；n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

```js
function debounce(fn, wait, imediate = true) {
  let timer;
  // 延迟执行函数
  const later = (context, args) => setTimeout(() => {
    timer = null; // 倒计时结束
    if (!imediate) {
      fn.apply(context, args);
      // 执行回调
      context = args = null;
    }
  }, wait);
  let debounced = function (...params) {
    let context = this;
    let args = params;
    if (!timer) {
      timer = later(context, args);
      if (!imediate) {
        // 立即执行
        fn.apply(context, args);
      }
    } else {
      clearTimeout(timer);
      // 函数在每个等待时延的结束被调用
      timer = later(context, args);
    }
  }
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }
  return debounced;
}
```
防抖应用场景：
- 每次resize/scroll触发统计事件
- 文本输入的验证(连续输入文字后发送AJAX请求进行验证，验证一次就好)

### 节流
<strong>节流(throttle)：</strong>高频事件在规定时间内只会执行一次，也就是降低频率，执行一次后，只要大于设定的执行周期后才会执行第二次

```js
function throttle(fn, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now() || new Date().getTime();
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) context = args = null;
  };
  var throttled = function () {
    var now = Date.now() || new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      result = fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和trailing
      timeout = setTimeout(later, remaining);
    }
    return reslut;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}
```
节流应用场景：
- DOM元素的拖拽功能实现(mousemove)
- 射击游戏的mousedown/keydown事件(单位时间内只能发射一枚子弹)
- 计算鼠标移动的距离(mousemove)
- canvas模拟画板功能(mousemove)
- 搜索联想(keyup)
- 监听滚动事件判断是否到了页面某个位置然后执行某个操作(比如滑动到底部请求AJAX自动加载更多(给scroll加了debounce后，只要用户停止滚动后，才会判断是否到了页面底部，如果是throttle，只要页面滚动就会间隔一段时间判断一次))

