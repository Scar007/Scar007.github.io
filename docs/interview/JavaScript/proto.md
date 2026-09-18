---
publish: false
title: 原型链
---
## 文章链接
[原型及原型链](https://www.scar.vip/%e5%89%8d%e7%ab%af/%e6%90%9e%e6%87%82js%e5%8e%9f%e5%9e%8b%e5%92%8c%e5%8e%9f%e5%9e%8b%e9%93%be/)
## 面试题
#### 题目1：
```JavaScript
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

console.log(b.n); // 1
console.log(b.m); // undefined

console.log(c.n); // 2
console.log(c.m); // 3
```
解析：先声明了A函数，定义了A.prototype.n，b是A的一个实例，所以b把A的原型上的东西复制了过来，下边A.prototype变成了一个对象，c属于新的A的实例，继承了A的新的属性。所以后边打印b的属性的时候，取值是从之前老的A上的取值，b.n为1，b.m为undefined，而c继承的新A上的值，所以打印c.n为2，c.m为3


题目2：
```js
function A() {
  this.name = 'a'
  this.color = ['green', 'yellow']
}
function B() {}
B.prototype = new A()
var b1 = new B()
var b2 = new B()

b1.name = 'change'
b1.color.push('black')

console.log(b2.name) // a
console.log(b2.color) // ['green', 'yellow', 'black']
```
解析：b2没有设置单独的name，所以根据原型链查找找到了父类上的name继承过来，所以打印a；color是一个数组，为复杂数据类型，开辟了一个堆空间专门用来存储，所以直接赋值的实例都指向的是同一个堆空间，拿到的只是一个地址。同一个地方所以当p1对数组进行操作的时候，其他所有的实例上的数据都变了，没变的只是指向堆空间的那个地址。


#### 题目3：
```js
function Person(name){
  this.name = name;
}

Person.prototype.sayName = function(welcome) {
	console.log(welcome, this.name);
}

var p1 = new Person('gjr');
p1.sayName(); // undefined、gjr
var p2 = new Person();
p2.sayName('hello'); // hello、undefined
```
解析：new p1 的时候，设置了p1的私有属性name为'gjr'，执行sayName的时候根据原型查找然后执行，但是sayName并没有传递参数，所以打印welcome是undefined，this.name则为刚才赋值的p1的私有属性'gjr';<br>
而p2的sayName执行，传递了参数hello，所以welcome打印出了'hello'，而p2并没有设置私有name，构造函数Person的原型上也没有name属性，所以打印的this.name则为undefined



#### 题目4：
讲讲person和Object的关系，形式不限。
```js
function Person(name) {
    this.name = name;
}
let p1 = new Person('gjr');
```
打印值：
```js
console.log(p1.constructor === Person) // true
console.log(Person.prototype.constructor === Person) // true
console.log(p1.__proto__ === Person.prototype) // true
console.log(Person.__proto__ === Function.prototype) // true
console.log(Function.__proto__ === Function.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__ === null) // true
```
答案解析：<br>
第一种：
1. <strong>p1 与 Person 的关系</strong> <br>
p1是构造函数Person的实例，它是一个对象，所有的对象都有一个__proto__的内置属性，叫做原型指针，指向构造函数的原型。
即：p1.\_\_proto__ === Person.prototype
2. <strong>Person 与 Function 的关系</strong> <br>
  - Person 是构造函数，构造函数也是函数，函数本身也是对象，函数除了有原型对象(prototype)以外，也有原型指针(\_\_proto__)；
  - 函数都是由Function构造出来的，所以函数的原型指针(\_\_proto__)指向Function的原型对象(prototype):
  Person.\_\_proto__ === Function.prototype
3. <strong>Function 自己构建自己</strong> <br>
所有的函数都是Function构造出来的，所以Function的原型指针(\_\_proto__)指向Function的原型对象(prototype)：
Function.\_\_proto__ === Function.prototype
4. <strong>Function 与 Object 的关系</strong><br>
Function的原型对象本身就是对象，因为“万物皆对象”，所以其原型指针(\_\_proto__)指向Object的原型对象(prototype)

以上关系推导验证：
```js
//第一步验证
console.log(p1.__proto__ === Person.prototype); // true

//第二步验证
console.log(Person.__proto__ === Function.prototype); // true

//第三步验证
console.log(Function.__proto__ === Function.prototype); // true

//第四步验证
console.log(Function.prototype.__proto__ === Object.prototype); // true
```

第二种：
1. <strong>p1</strong><br>
p1是构造函数Person的实例，继承了父类的私有和公有属性。
2. <strong>Person</strong><br>
  - Person的原型对象(prototype)也是对象，除了有原型指针(\_\_proto__)，还有构造器属性(constructor)
  - Person的原型对象(prototype)的原型指针(\_\_proto__指向Object的原型对象(prototype)，即：Person.prototype.\_\_proto__ === Object.prototype
  - Person的原型对象(prototype)的构造器属性(constructor)指向自己，即：Person.prototype.constructor === Person
3. <strong>Function</strong><br>
  - 所有的函数都是由Function构造出来的
  - Function的原型对象(prototype)也是对象，和Person一样，也都有构造器属性(constructor)
  - Function的原型对象(prototype)的原型指针(\_\_proto__)指向Object的原型对象(prototype)，即：Function.prototype.\_\_proto__ === Object.prototype
  - Function的原型对象(prototype)的构造器属性(constructor)指向自己，即：Function.prototype.constructor === Function
4. <strong>Object</strong><br>
  - Object是JavaScript的内建构造函数，也拥有原型对象(prototype)和原型指针(\_\_proto__)
  - Object是函数，所以原型指针(\_\_proto__)指向Function的原型对象(prototype)，即：Object.\_\_proto__ === Function.prototype
  - Object的原型对象(prototype)同样包含构造器属性(constructor)
  - Object的原型对象(prototype)的构造器指向自身，即：Object.prototype.constructor === Object
  - Object的原型对象(prototype)的原型指针(\_\_proto__)为null，即：Object.prototype.\_\_proto__ === null

推导验证结果：
```js
//第一步验证
console.log(person.__proto__ === Person.prototype); // true
console.log(person.constructor === Person); // true

//第二步验证
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.constructor === Person); // true
console.log(Person.prototype.__proto__ === Object.prototype);// true

//第三步验证
console.log(Function.__proto__ === Function.prototype); // true
console.log(Function.prototype.constructor === Function);
console.log(Function.prototype.__proto__ === Object.prototype);

//第四步验证
console.log(Object.__proto__ === Function.prototype); // true
console.log(Object.prototype.constructor === Object); // true
console.log(Object.prototype.__proto__ === null); // true
```

#### 题目5
```js
function Parent() {
  this.a = 1;
  this.b = [1, 2, this.a];
  this.c = { demo: 5 };
  this.show = function () {
    console.log(this.a , this.b , this.c.demo);
  }
}
function Child() {
  this.a = 2;
  this.change = function () {
    this.b.push(this.a);
    this.a = this.b.length;
    this.c.demo = ++this.a;
  }
}
Child.prototype = new Parent();
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();
child1.a = 11;
child2.a = 12;
parent.show(); // 1, [1, 2, 1], 5
child1.show(); // 11, [1, 2, 1], 5
child2.show(); // 12, [1, 2, 1], 5

child1.change();
child2.change();
parent.show(); // 1, [1, 2, 1], 5
child1.show(); // 5, [1, 2, 1, 11, 12], 6
child2.show(); // 6, [1, 2, 1, 11, 12], 6
```

此题具体解析过程可以看图：
![avatar](https://static.scar.vip/image/ptoto-Q1.png)


#### 题目6：
```js
function A() {
  console.log(this);
  this.a = 1;
  this.b = [1, 2, this.a];
  this.c = {
    a: 3,
    fn: function() {
      console.log(this)
      console.log(this.a);
    }
  };
  this.d = function() {
    console.log(this);
    console.log(this.a, this.b, this.c.a);
  };
}

function B() {
  console.log(this);
  this.a = 6;
  this.fn = function() {
    console.log(this);
    this.b.push(this.a);
    this.a = this.b.length;
    this.c.a = ++this.a;
  }
}

B.prototype = new A();

var a1 = new A();
var a2 = a1.c.fn;

var b1 = new B();
var b2 = new B();

b1.a = 8;
b2.a = 9;

a1.d();
a1.c.fn();

a2();

b1.d();
b1.c.fn();

b2.d();
b2.c.fn();

b1.fn();

b2.fn();

a1.d();

b1.d();
b1.c.fn();

b2.d();
b2.c.fn();
```
具体解析过程如下图：
![avatar](https://static.scar.vip/image/proto-Q2.png)

#### 题目7
```js
Object.prototype.a = 'Object'
Function.prototype.a = 'Function'
function Person() {}
var child = new Person()
console.log(Person.a)
console.log(child.a)
console.log(child.__proto__.__proto__.constructor.constructor.constructor)
```
题目解析：<br>
child是属于Person的一个实例，所以child的原型指针指向Person的原型对象，而每个实例上都有一个constructor的属性，指向构造函数本身，Person是一个构造函数，本质上是Function创建出来的，Person又可以看做Function的一个实例，Function本身也可以看做由Function自己创建得来的，“万物皆对象”，所以Function的原型对象的原型指针又指向Object的原型对象，Object也是一个函数，所以Object的原型指针也指向Function的原型对象，但Object再向上查找的话，就是最顶层的null了，也就是“万物皆空”<br>
整体关系如下(以下打印结果均为true)：
```JavaScript
  child.__proto__ === Person.prototype
  child.constructor === Person
  Person.__proto__ === Function.prototype
  Person.prototype.constructor === Person
  Function.__proto__ === Function.prototype
  Function.__proto__ === Function
  Function.prototype.__proto__ === Object.prototype
  Function.prototype.__proto__ === Object
  Object.__proto__ === Function.prototype
  Object.__proto__ === Function
  Object.prototype.__proto__ === null
```
接下来看这道，由原型链关系得知:<br>
Person是一个构造函数，所以会先查找到Function，所以Person.a会打印出来Function<br>
child是Person的一个实例对象，所以按照原型链查找会先找到Object，所以child.a打印出来Object<br>
根据原型链找到child.__proto__会找到Person.prototype，然后Person.prototype.__proto__会找到Object.prototype，而我们已经得知Object是由Function创建出来的，所以Object.constructor指向Function，Function自己构建自己，所以后边多少层的constructor属性都指向了Function





#### 题目8
```js
var F = function(){}
Object.prototype.a = function(){
  console.log('a()')
}
Function.prototype.b = function(){
  console.log('b()')
}
var f = new F()
F.a()
F.b()
f.a()
f.b()
```
解题：
```
F instanceof Object // true
F instanceof Function // true
f instanceof Object // true
f instanceof Function // false
```
通过instanceof可以得知，F属于Object和Function的实例，所以F.a()和F.b()分别打印出'a()'和'b()'<br>
f属于F构造函数的一个实例，通过instanceof得知，f属于Object的实例，而不属于Function的实例，所以f.a()会查找到Object上的a打印出'a()'，而f.b()由于无法找到b，所以会报错'Uncaught TypeError: F.a is not a function'




## 原型漏洞问题
这个问题主要考察的是一层object.freeze(),通过object的冻结来实现对象的无法修改。由于之前jquery和lodash都爆发了相关漏洞。






## 如何判断一个对象是否属于某个类？
判断对象类型最好的方式：对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
```js
if(a instanceof Person){
   alert('yes');
}

Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
```
