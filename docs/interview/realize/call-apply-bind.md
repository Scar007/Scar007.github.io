---
publish: false
title: 实现call、apply、bind
---
## call
### Function.prototype.call()

call() 方法调用一个函数, 其具有一个指定的 this 值和多个参数(参数的列表)。核心有：
- 将函数设为传入参数的属性
- 指定this到函数并传入给定参数执行函数
- 如果不传入参数或参数为null，默认指向window / global
- 删除参数上的函数

```JavaScript
func.call(thisArg, arg1, arg2, ...)
```
它运行 func，提供的第一个参数 thisArg 作为 this，后面的作为参数。

看一个简单的例子：
```JavaScript
function sayWord() {
  var talk = [this.name, 'say', this.word].join(' ');
  console.log(talk);
}

var bottle = {
  name: 'bottle', 
  word: 'hello'
};

// 使用 call 将 bottle 传递为 sayWord 的 this
sayWord.call(bottle); 
// bottle say hello
```
所以，call 主要实现了以下两个功能：
- call 改变了 this 的指向
- bottle 执行了 sayWord 函数


<strong> 模拟实现 call 有三步： </strong>
- 将函数设置为对象的属性
- 执行函数
- 删除对象的这个属性

```JavaScript
Function.prototype.call = function (context) {
  // 将函数设为对象的属性
  // 注意：非严格模式下, 
  //   指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中就是 window 对象)
  //   值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象(用 Object() 转换）
  context = context ? Object(context) : window; 
  context.fn = this;
    
  // 执行该函数
  let args = [...arguments].slice(1);
  let result = context.fn(...args);

  // 删除该函数
  delete context.fn
  // 注意：函数是可以有返回值的
  return result;
}
```

- [深度解析 call 和 apply 原理、使用场景及实现](https://github.com/yygmind/blog/issues/22)




## apply
### Function.prototype.apply()
apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或[类似数组对象）提供的参数。
```JavaScript
func.apply(thisArg, [argsArray])
```
它运行 func 设置 this = context 并使用类数组对象 args 作为参数列表。

例如，这两个调用几乎相同：
```JavaScript
func(1, 2, 3);
func.apply(context, [1, 2, 3])
```
两个都运行 func 给定的参数是 1,2,3。但是 apply 也设置了 this = context。

call 和 apply 之间唯一的语法区别是 call 接受一个参数列表，而 apply 则接受带有一个类数组对象。

需要注意：Chrome 14 以及 Internet Explorer 9 仍然不接受类数组对象。如果传入类数组对象，它们会抛出异常。

<strong> 模拟实现 apply </strong>

```JavaScript
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;
  
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
      
    delete context.fn
    return result;
}
```

- [深度解析 call 和 apply 原理、使用场景及实现](https://github.com/yygmind/blog/issues/22)




## bind
### 解析 bind 原理，并手写 bind 实现
bind()
> bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。——— MDN

bind 方法与 call / apply 最大的不同就是前者返回一个绑定上下文的函数，而后两者是直接执行了函数。

来个例子说明下：
```JavaScript
let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

bar.call(foo, "Jack", 20); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

let bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
bindFoo1();
// {value: 1, name: "Jack", age: 20}

let bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
bindFoo2(20);
// {value: 1, name: "Jack", age: 20}
```
通过上述代码可以看出 bind 有如下特性：

1. 指定 this
2. 传入参数
3. 返回一个函数
4. 柯里化

<strong> 模拟实现： </strong>

```JavaScript
Function.prototype.bind = function (context) {
    // 调用 bind 的不是函数，需要抛出异常
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    
    // this 指向调用者
    var self = this;
    // 实现第2点，因为第1个参数是指定的this,所以只截取第1个之后的参数
    var args = Array.prototype.slice.call(arguments, 1); 
    
    // 实现第3点,返回一个函数
    return function () {
        // 实现第4点，这时的arguments是指bind返回的函数传入的参数
        // 即 return function 的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        // 实现第1点
        return self.apply( context, args.concat(bindArgs) );
    }
}
```
但还有一个问题，bind 有以下一个特性：
> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

来个例子说明下：
```JavaScript
let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

let bindFoo = bar.bind(foo, 'Jack');
let obj = new bindFoo(20);
// undefined
// Jack
// 20

obj.habit;
// shopping

obj.friend;
// kevin
```

上面例子中，运行结果 this.value 输出为 undefined ，这不是全局 value 也不是 foo 对象中的 value ，这说明 bind 的 this 对象失效了，new 的实现中生成一个新的对象，这个时候的 this 指向的是 obj 。

这个可以通过修改返回函数的原型来实现，代码如下:

```JavaScript
Function.prototype.bind = function (context) {
    // 调用 bind 的不是函数，需要抛出异常
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    
    // this 指向调用者
    var self = this;
    // 实现第2点，因为第1个参数是指定的this,所以只截取第1个之后的参数
    var args = Array.prototype.slice.call(arguments, 1);
    
    // 创建一个空对象
    var fNOP = function () {};
    
    // 实现第3点,返回一个函数
    var fBound = function () {
        // 实现第4点，获取 bind 返回函数的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        // 然后同传入参数合并成一个参数数组，并作为 self.apply() 的第二个参数
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
        // 注释1
    }
    
    // 注释2
    // 空对象的原型指向绑定函数的原型
    fNOP.prototype = this.prototype;
    // 空对象的实例赋值给 fBound.prototype
    fBound.prototype = new fNOP();
    return fBound;
}
```
注释1 ：
- 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true ，可以让实例获得来自绑定函数的值，即上例中实例会具有 habit 属性。
- 当作为普通函数时，this 指向 window ，此时结果为 false ，将绑定函数的 this 指向 context

注释2 ：
- 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值，即上例中 obj 可以获取到 bar 原型上的 friend
- 至于为什么使用一个空对象 fNOP 作为中介，把 fBound.prototype 赋值为空对象的实例（原型式继承），这是因为直接 fBound.prototype = this.prototype 有一个缺点，修改 fBound.prototype 的时候，也会直接修改 this.prototype ；其实也可以直接使用ES5的 Object.create() 方法生成一个新对象，但 bind 和 Object.create() 都是ES5方法，部分IE浏览器（IE < 9）并不支

> 注意： bind（） 函数在 ES5 才被加入，所以并不是所有浏览器都支持，IE8 及以下的版本中不被支持，如果需要兼容可以使用 Polyfill 来实现

### 补充：柯里化
在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的。
```JavaScript
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12

add(1)(2);
// 3
```

这里定义了一个 add 函数，它接受一个参数并返回一个新的函数。调用 add 之后，返回的函数就通过闭包的方式记住了 add 的第一个参数。所以说 bind 本身也是闭包的一种使用场景。

柯里化是将 f(a,b,c) 可以被以 f(a)(b)(c) 的形式被调用的转化。JavaScript 实现版本通常保留函数被正常调用和在参数数量不够的情况下返回偏函数这两个特性。


- [深度解析bind原理、使用场景及模拟实现](https://github.com/yygmind/blog/issues/23)

## bind，call 和 apply 的异同？
### 相似之处：
- 它们的第一个参数都是this要指向的对象；
- 都是用来改变函数的this指向的；
- 都可以利用后继参数传参；
### 区别
- 执行方面：使用call和apply之后函数可自动执行，但是使用bind需要手动执行；
- 参数接收方面： call和apply接收的第一个参数是在其中运行函数的作用域，不同的是在接收的第二个参数时，apply接收的是一个数组，而call接收的是参数列表，需要跟函数保持一一对应。

> 注意： call和apply扩充了函数的作用域。
### 应用场景：
- 如果不需要关心具体有多少参数被传入函数的时候(或者参数较多情况下)，可以选用apply；
- 如果确定函数可以接收多少个参数（或参数较少情况下），并且想一目了然的表达形参和实参的对象关系的，可以选用call;
- 如果想将来再调用方法，不需要立即得到函数的返回结果的，可以选用bind;
