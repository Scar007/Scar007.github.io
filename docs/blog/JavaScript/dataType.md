---
publish: false
title: 数据类型
createTime: 2024/04/06 21:34:38
permalink: /blog/a94ygpgf/
---
## javascript 有哪几种数据类型
六种基本数据类型
- undefined
- null
- string
- boolean
- number
- symbol(ES6)

两种引用类型
- Object
- Array

## 基本数据类型和复杂数据类型存储有何区别？
基本数据类型存储在栈空间，存储的是值。

复杂数据类型存储在堆空间，地址(指向堆中的值)存储在占内存。当把对象赋值给另一个变量时，其实是将这个指向堆空间的地址赋值给这个变量，因为都是通过地址指向同一个地方，所以一个对象发生改变，其余也会发生改变。



## 数据类型检测的方式有哪些

**typeof**

其中数组、对象、null 都会被判断为 object，其他判断都正确。
```js
console.log(typeof 2) // number
console.log(typeof true) // boolean
console.log(typeof 'str') // string
console.log(typeof undefined) // undefined
console.log(typeof null) // object
console.log(typeof []) // object
console.log(typeof {}) // object
```

**instanceof**

instanceof 可以正确判断对象的类型，其内部运行机制是判断在其 原型链中能否找到该类型的原型。

可以看到，instanceof 只能正确判断引用数据类型，而不能判断基 本数据类型。instanceof 运算符可以用来测试一个对象在其原型链 中是否存在一个构造函数的 prototype 属性。
```js
console.log(2 instanceof Number) // false
console.log(true instanceof Boolean) // false
console.log('str' instanceof String) // false
console.log([] instanceof Array) // true
console.log({} instanceof Object) // true
console.log(function(){} instanceof Function) // true
```

**constructor**

```js
console.log((2).constructor === Number) // true
console.log((true).constructor === Boolean) // true
console.log(('str').constructor === String) // true
console.log(([]).constructor === Array) // true
console.log(({}).constructor === Object) // true
console.log((function(){}).constructor === Function) // true
```
constructor 有两个作用，一是判断数据的类型，二是对象实例通过 
constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象 来改变它的原型，constructor 就不能用来判断数据类型了：

```js
function fn() {}
fn.prototype = new Array()

var f = new fn()

console.log(f.constructor === fn) // false
console.log(f.constructor === Array) // true
```

**Object.prototype.toString.call()**

Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：

```js
var a = Object.prototype.toString;
console.log(a.call(2)) // [object Number]
console.log(a.call(true)) // [object Boolean]
console.log(a.call('str')) // [object String]
console.log(a.call(undefined)) // [object Undefined]
console.log(a.call(null)) // [object Null]
console.log(a.call([])) // [object Array]
console.log(a.call({})) // [object Object]
console.log(a.call(function(){})) // [object Function]
```

同样是检测对象 obj 调用 toString 方法，obj.toString()的结果和 Object.prototype.toString.call(obj)的结果不一样， 这是为什 么？

这是因为 toString 是 Object 的原型方法，而 Array、function 等类 型作为 Object 的实例，都重写了 toString 方法。不同的对象类型调 用 toString 方法时，根据原型链的知识，调用的是对应的重写之后


3 的 toString 方法（function 类型返回内容为函数体的字符串，Array 类型返回元素组成的字符串…）， 而不会去调用 Object 上原型 toString 方法（返回对象的具体类型），所以采用 obj.toString() 不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要 得到对象的具体类型时，应该调用 Object 原型上的 toString 方法。



## null是对象吗？
不是。<br>
null属于JavaScript的基本数据类型，不要被typeof null === 'object'迷惑，可以将其看做JavaScript二进制计算设计的一个bug。






## typeof 是否正确判断类型？
- typeof 能正确判断基本数据类型，除了typeof null输出的是'object'
- 对于复杂类型来说，typeof不能正确判断其类型，typeof 函数 输出'function'，其余复杂类型全是输出'object'



## instanceof的原理？是否能正确判断数据类型？ instanceof实现原理是什么？
原理：instanceof是通过原型链判断的，A instanceof B，表示在A的原型链中层层查找，是否有原型等于B.prototype
，如果一直找到A的原型链的顶端(null，Object.prototype.\_\_proto__)，仍然没有等于B.prototype，则返回false，找到的话就是true。

instanceof可以准确判断复杂数据类型，但是不能正确判断基本数据类型。

instanceof实现代码：
```js
function instanceof(L, R) {
  while(true) {
    if (L === null) { // 找到了原型链的顶端
      return false;
    } else if (L.prototype === R.prototype) {
      return true
    }

    L = L.__proto__; // 持续向上查找
  }
}
```





## 如何判断一个变量是不是数组？
- 使用Array.isArray判断，返回true，则为数组
- 用instanceof Array 判断，返回true，则为数组
- 使用Object.prototype.toString.call判断，如果值为[object Array]，则是数组
```js
function fn() {
    console.log(Array.isArray(arguments));   //false; 因为arguments是类数组，但不是数组
    console.log(Array.isArray([1,2,3,4]));   //true
    console.log(arguments instanceof Array); //fasle
    console.log([1,2,3,4] instanceof Array); //true
    console.log(Object.prototype.toString.call(arguments)); //[object Arguments]
    console.log(Object.prototype.toString.call([1,2,3,4])); //[object Array]
    console.log(arguments.constructor === Array); //false
    arguments.constructor = Array; // 自己指定constructor，所以用constructor判断数据类型不靠谱
    console.log(arguments.constructor === Array); //true
    console.log(Array.isArray(arguments));        //false
}
fn(1,2,3,4);
```




## 类数组和数组的区别是什么？
- 拥有length属性，其他属性(索引)为非负数(对象中的索引会被当做字符串来处理)；
- 类数组是一个普通对象，不具有数组的方法；

常见的类数组有：函数的参数arguments，DOM对象列表(如通过document.querySelectAll得到的列表)，JQuery对象

类数组可以转换为数组：<br>
方法一：Array.prototype.slice.call(arrayLike, start);<br>
方法二：[...arrayLike]; 任何定义了遍历器(Iterator)结果的对象，都可以用扩展运算符转为真正的数组。<br>
方法三：Array.from(arrayLike);(Array.from方法用于将 类数组 和 可遍历的对象 转为真正的数组)<br>






## 数组的哪些API会改变原数组？
[数组知识点总结(常用API)](https://www.scar.vip/%e5%89%8d%e7%ab%af/%e6%95%b0%e7%bb%84%e7%9f%a5%e8%af%86%e6%80%bb%e7%bb%93/)<br>
会修改原数组的API有：
splice、sort、push、pop、shift、unshift、reverse、fill、copy、copyWithin、

不会修改原数组的API有：
slice、map、forEach、every、filter、reduce、find、entries






## 什么是负无穷大？
负无穷大是javascript中的一个数字，可以通过将负数除以零得到。







## 什么是未声明和未定义的变量？
未声明的变量是指程序中不存在且为声明的变量。如果程序尝试读取为声明的变量的值，运行会报错；
```js
conosle.log(b);

// Uncaught ReferenceError: b is not defined
    at <anonymous>:1:1
```
未定义的变量是在程序中声明但是尚未赋予任何值的变量。如果程序中使用了未定义的变量的值，会返回一个undefined。
```js
let c;
console.log(c);  // undefined
```





## delete操作符的功能是什么
delete操作符用于删除程序中的所有变量或对象，但是不能删除使用var关键字声明的变量。






## null，undefined 或 undeclared的区别以及如何检测？
#### null：未定义的属性，表示该处不应该有值；
- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点。
#### undefined： 定义但是未赋值的为undefined；
- 变量被声明了，但没有赋值时，就等于undefined(较为常见)。
- 调用函数时，应该提供的参数没有提供，该参数等于undefined。
- 对象没有赋值的属性，该属性的值为undefined。
- 函数没有返回值时，默认返回undefined。
#### undecleared: javascript访问不会报错；


检测方式：
- null是一种特殊的object，表示无值；
```js
console.log(typeof null);  // object

const a = null;
if(!a && typeof(a) !== 'undefined' && a!==0) {
    alert('a is null')
} else {
     alert('a is not null')
}
```
- undefined: 是声明但未赋值的变量；
```js
const a = undefined;
if(typeof(a) === 'undefined') {
    alert('a is undefined')
} else {
     alert('a is not undefined')
}
```
- undeclared：undeclared 是一种语法错误，不是数据类型，是未声明也未赋值的变量。

注意JavaScript访问时js引擎不会报错，会把它当成全局变量，即当成window的属性。







## 什么类型的数据放在内存中？什么不放在内存中？
- 基本类型（Boolean, String, Number, Null, Undefined, Symbol（新增））的值保存在内存中。从一个变量向另一个变量赋值基本类型的值，会创建这个值的一个副本；
- 引用数据类型（object）的值是个对象，保存在堆内存中。

注意：
- 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针。从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终指向的都是同一个对象；
- javascript不允许直接访问内存中的位置，也就是不能直接访问操作对象的内存空间。在操作对象时，实际上在操作对象的引用而不是实际的对象；
