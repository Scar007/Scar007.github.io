---
publish: false
title: 实现new
createTime: 2021/03/03 16:45:42
permalink: /blog/h4imhyio/
---
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤1新创建的对象作为this的上下文，并执行构造函数中的方法 ；
4. 如果该函数没有返回对象，则返回this。

### 思想一
```javascript
function new_object() {
  // 创建一个空的对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型 （不推荐使用）
  obj.__proto__ = Con.prototype
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments)
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}
```
new Object() 方式创建对象本质上是方法调用，涉及到proto链中遍历该方法，当找到该方法后，又会生产方法调用必须的堆栈信息，方法调用后，还要释放该堆栈，性能不如字面量的方式。<br>
通过对象字面量定义对象时，不会调用Object构造函数。

> 警告: 通过现代浏览器的操作属性的便利性，可以改变一个对象的 [[Prototype]] 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作，使用这种方式来改变和继承属性是对性能影响非常严重的，并且性能消耗的时间也不是简单的花费在 obj.__proto__ = ... 语句上, 它还会影响到所有继承来自该 [[Prototype]] 的对象，如果你关心性能，你就不应该在一个对象中修改它的 [[Prototype]]。相反, 创建一个新的且可以继承 [[Prototype]] 的对象，推荐使用 Object.create()
————MDN

进一步优化 new 实现:

```JavaScript
// 优化后 new 实现
function create() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  Con = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  let ret = Con.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
};
```

### 思想二
```JavaScript
function myNew(fn, ...args) {
  const obj = {};
  obj.__proto__ = fn.prototype;
  const res = fn.call(obj, ...args);
  return typeof res === 'object' ? res : obj;
}
```

### 思想三
```JavaScript
function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype); // 相当于 obj.__proto__ = fn.prototype
  let result = fn.apply(obj, args); // 执行构造方法, 绑定新 this
  // 如果构造方法 return 了一个对象，那么就返回该对象，否则返回创建的新对象
  return Object.prototype.toString.call(result) === '[object Object]' ? result : obj;
}

```

### 思想四
```JavaScript
function myNew(fn, ...args) {
  let _this = {}
  let result = fn.apply(_this, args)
  _this.__proto__ = fn.prototype
  return typeof (result === 'object' || typeof result === 'function') &&
    result != null
    ? result
    : _this
}
```

### 思想五
```JavaScript
function _new(){
  const Constructor = Array.prototype.shift.call(arguments)
  const obj = {}
  obj.__proto__ = Constructor.prototype
  const ret = Constructor.apply(obj,arguments)
  return typeof ret === 'object' ? ret : obj
}
```

### 思想六
步骤：创建，执行，原型链，判断。

1. 创建：创建一个新的空对象（对象字面量{}或者借用构造函数new Object）
2. 执行：this指向新对象，执行构造函数，故应先获取构造函数。
3. 原型链：设置原型链，新对象的__proto__指向构造函数的prototype
4. 判断：判断传入对象的类型，是对象，则返回新对象；不是对象，则直接返回。

```JavaScript
function lxhNew(){
    // 1. 创建
    let obj = new Object();
    // 2.执行
    let Constructor = [].shift.call(arguments);
    let result = Constructor.apply(obj, arguments);
    // 3.原型链
    result.__proto__ = Constructor.prototype;
    // 4.判断
    return result instanceof Object? result: obj;
}
```



