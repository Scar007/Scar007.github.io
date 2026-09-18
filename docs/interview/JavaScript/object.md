---
publish: false
title: 对象
---
## JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 以及内置（build-in objects）对象的区别？
概念：<br>
<strong>宿主对象</strong>： 宿主对象不是引擎的原生对象，而是由宿主框架通过某种机制注册到js引擎中的对象；

<strong>内置对象</strong>： 在引擎初始化阶段就被创建好的对象，是原生对象的一个子集；

<strong>原生对象</strong>： 除了内置对象之外，还包括了一些在运行过程中动态创建的对象；

内容：<br>
- 原生对象包括： Object, Function, Array, String, Boolean, Number, Date, RegExp, Error, EvalError, RangeError, ReferenceError, SyntaxError, Typerror, URLError等；
- 内置对象包括： Global(全局对象), Math ；（注意所有的内置对象都是原生对象）
- 宿主对象包括： 有宿主提供的对象，在浏览器中window对象以及其下边的所有子对象（例如dom等），在node中是global以及其子对象，也包含自定义的类对象。

区别：<br>
- 内置对象是原生对象的一个子集；前者总在引擎初始化阶段就被创建好对象，而后者还包括了一些在运行过程中动态创建的对象；
- 宿主对象不是引擎的原生对象，而是有宿主框架通过某种机制注册到js引擎当中的对象；





## 可变 (mutable) 和不变 (immutable) 对象的区别?
可变（mutable）： 在JS中，对象是引用类型的数据，其优点在于频繁的修改对象时都是在原对象的基础上修改的，并不需要进行重新创建，这样就可以有效的利用内存，不会造成内存空间的浪费；

不可变（immutable）： 每一次修改一个immutable对象时，都会创建一个新的不可变对象，在新对象上的操作不会影响到原对象的数据。







## 对象到字符串的转换步骤?
1. 如果对象有 toString()方法，javascript 调用它。如果返回一个原始值（primitive value 如：string number boolean）,将这个值转换为字符串作为结果
2. 如果对象没有 toString()方法或者返回值不是原始值，javascript 寻找对象的 valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3. 否则，javascript 不能从 toString()或者 valueOf()获得一个原始值，此时 throws a TypeError






## 对象到数字的转换步骤?
1. 如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果
2. 否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果
3. 否则，throws a TypeError






## 谈谈This对象的理解。
this总是指向函数的直接调用者（而非间接调用者）； 如果有new关键字，this指向new出来的那个对象； 在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；

[this问题总结](https://www.scar.vip/%E5%89%8D%E7%AB%AF/javascript%E4%B8%AD%E7%9A%84this%E6%8C%87%E5%90%91%E9%97%AE%E9%A2%98%E6%80%BB%E7%BB%93/)






## 介绍JS有哪些内置对象？
- 数据封装类对象：Object、Array、Boolean、Number、String
- 其他对象：Function、Arguments、Math、Date、RegExp、Error
- ES6新增对象：Symbol、Map、Set、Promises、Proxy、Reflect