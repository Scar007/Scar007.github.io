---
publish: false
title: ECMAScript
---
## ES6中的class 和 ES5的类 有什么区别？
- ES6 class内部所有定义的方法都是不可枚举的。
- ES6 class必须使用new调用
- ES6 class不存在变量提升
- ES6 class默认是严格模式
- ES6 class子类必须在构造函数中调用super()，这样才有this对象，ES5中类继承的关系是相反的，现有的子类this，然后用父类的方法应用在this上




## ES6的新特性有哪些？
- 增加了块级作用域(let, const)
- 提供了定义类的语法糖(class)
- 新增了一种基本数据类型(symbol)
- 新增了变量的解构赋值
- 函数参数允许设置默认值，引入了rest参数，新增了箭头函数
- 数组新增了一些API：如isArray、from、of等方法，数组实例新增了entries(), keys(), values()等方法
- 对象和数组新增了扩展运算符
- ES6新增了模块化(import、export)
- ES6新增了Set和Map数据结构
- ES6原生提供了Proxy构造函数，用来生成Proxy实例
- ES6新增了生成器(Generator)和遍历器(Iterator)
- 异步解决方案：
  - Promise的使用和实现
  - generator：
    - yield：暂停代码
    - next()：继续执行代码
    ```js
    function *test() {
      yield 'hello';
      yield 'world';
      yield 'ending';
    }
    const generator = test();
    generator.next() // {value: "hello", done: false}
    generator.next() // {value: "world", done: false}
    generator.next() // {value: "ending", done: false}
    generator.next() // {value: "undefined", done: false}
    ```
    - await/async：是generator的语法糖，babel中式基于promise实现
    ```js
    function fetchUser() {
      return 'gjr'
    }
    async function test() {
      let user = await fetchUser();
      return user;
    }
    test(); //返回一个Promise： Promise {<fulfilled>: "gjr"}
    ```






## ES6 class和构造函数的区别
1. class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
2. class 声明内部会启用严格模式。
3. class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
4. class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
5. 必须使用 new 调用 class。
6. class 内部无法重写类名。
7. ES5 和 ES6 子类 this 生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。







## 使用箭头函数应该注意的情况
1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

3. 不可以使用`arguments`对象，箭头函数内部没有arguments对象。如果要用，可以用 rest 参数代替。

4. 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

`this`指向的固定化，并不是因为箭头函数内部有绑定`this`的机制，实际原因是箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`。正是因为它没有`this`，所以也就不能用作构造函数。

除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。






## ES6 的 set 和 map 有何区别？
[前端面试题之Set,Map的区别](https://zhuanlan.zhihu.com/p/81234278)
[彻底弄懂ES6中的Map和Set](https://blog.fundebug.com/2019/05/28/es6-map-set/)