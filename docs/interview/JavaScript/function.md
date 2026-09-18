---
publish: false
title: 函数
---
## 同步 (synchronous) 和异步 (asynchronous) 函数的区别在哪里?
同步（阻塞模式）指的是：当发送一个请求时，需要等待返回，然后才能发送另一个请求。其有个等待的过程。此外，同步也可以避免出现死锁，读脏数据的发生。

异步（非阻塞模式）指的是：当发送一个请求时，不需要等待返回，可以随时发送下一个请求。其不需要等待。

区别： 最明显的就是一个需要等待，一个不需要等待。

拓展： 在项目过程中，可以根据需求，来考虑功能是使用同步还是异步。一般，有些功能为了缩短用户的等待时间，都会优先采用异步的方式；但是对于数据库保存等操作，一般采用的是同步的方式.






## 什么是柯里化函数？实现sum(1)(2)(3)返回结果是1,2,3之和。
就是把接收多个参数的函数变换成接收一个单一函数(最初函数的第一个参数)的函数，返回接收余下的参数并返回结果的新函数的技术。
```js
function sum(a) {
  return function(b) {
    return function (c) {
      return a + b + c;
    }
  }
}
console.log(sum(1)(2)(3)); // 6
```
拓展：实现一个curry函数，将普通函数进行柯里化
```js
function curry(fn, args = []) {
  return function () {
    let rest = [...args, ...arguments];
    if (rest.length < fn.length) {
      return curry.call(this, fn, rest);
    } else {
      return fn.apply(this, rest);
    }
  }
}

// test
function sum(a, b, c) {
  return a + b + c
}
let sumFn = curry(sum);
console.log(sumFn(1)(2)(3)); // 6
console.log(sumFn(1)(2, 3)); // 6
```






## 以下代码有什么区别：function Person(){}、var person = Person()、var person = new Person()
第一： function Person(){}是声明了一个名为Person的函数；<br>
第二： var person = Person()是直接调用了Person函数，并将返回值作为值赋值给变量person；<br>
第三： var person = new Person()创建了一个Person实例对象；<br>





## 什么是IIFE（立即调用函数表达式）
它是立即调用函数表达式（Immediately-Invoked Function Expression），简称为IIFE。指的是函数被创建后立即执行。看下面代码:
```js
(function IIFE(){
 console.log( "Hello!" );
})();

// "Hello!"
```
这种立即调用函数表达式一般应用于避免污染全局命名空间条件下。因为 IIFE（与任何其他正常函数一样）内部的所有变量在其作用域之外都是不可见的。





## 有几种匿名函数用例
匿名函数就是没有定义函数名的函数。

- 定义回调函数；
- 立即执行函数；
- 作为返回值的函数；
- 使用方法为 var func = function() {};定义的函数；





## OOP与函数式编程的差异与区别?
[函数式编程与面向对象编程的比较](https://blog.csdn.net/hujutaoseu/article/details/70162384)
[函数式编程（Functional Programming）相比面向对象编程（Object-oriented Programming）有哪些优缺点？](https://www.zhihu.com/question/19732025)





## generator
[廖雪峰generator](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112)
[阮一峰Generator 函数的含义与用法](http://www.ruanyifeng.com/blog/2015/04/generator.html)