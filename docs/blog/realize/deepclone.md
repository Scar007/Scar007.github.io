---
publish: false
title: 实现深拷贝
createTime: 2021/03/12 22:36:48
permalink: /blog/r8ov582a/
---

### 什么是浅拷贝和深拷贝？有什么区别？如何实现 Object 的深拷贝
浅拷贝是指只复制第一层对象，但是当对象的属性是引用类型时，实质复制的其引用，当引用指向的值改变时也会跟着改变。

深拷贝复制变量值，对于基本类型的变量，则递归至基本类型变量后，再复制。深拷贝后的对象与原来的对象是完全隔离的，互不影响，对一个对象的修改并不会影响另一个对象。
### 思想一
在js中，对象是引用类型。如果给一个变量赋值给一个对象的时候，这时候变量和对象都是指向同一个引用，即

```JavaScript
let obj1 = {a: 1}
let obj2 = obj1

console.log(obj2.a) // 1
obj2.a = 2
console.log(obj2.a) // 2
console.log(obj1.a) // 2
```

由于指向的是同一个引用，即 obj2 属性的值变化了，那么 obj1 也会跟着变化。

但是我们希望说不想要这种效果，那么就可以使用 浅拷贝 来实现，这样和原对象不是指向同一个引用，但是也会把对象的成员复制过来。

但是，浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就要使用到 深拷贝 了

### 深拷贝的实现
#### 1. JSON.parse(JSON.stringify(object))
通常可以使用 JSON.parse(JSON.stringify(object)) 来解决

```JavaScript
let obj1 = {
    a: 1,
    b: {
        c: 2
    }
}
let obj2 = JSON.parse(JSON.stringify(obj1))
obj2.b.c = '3'
console.log(obj1.b.c) // 2
```
但是使用 JSON.parse(JSON.stringify(object)) 也有弊端
1. 会忽略 undefined
2. 会忽略 symbol
3. 不能序列化函数
4. 不能解决循环引用的对象

#### 2. 递归
遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深拷贝

```JavaScript
// 递归判断是否对象和数组
function deepClone(obj, target) {
    if(!obj) return

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(Array.isArray(key) || (typeof obj[key] === 'object' && obj[key] !== null)) {
                target[key] = []
                deepClone(obj[key], target[key])
            } else {
                target[key] = obj[key]
            }
        }
    }

    return target
}
```

### 思想二
浅拷贝的复制了指向对象的指针， 地址和原对象的地址指向相同
深拷贝是完全脱离原对象，只有值和原对象保持一致

浅拷贝
```JavaScript
function extendCopy(p) {
　　var c = {};
　　for (var i in p) {
　　　　c[i] = p[i];
　　}
　　return c;
}
```
深拷贝
```JavaScript
function checkedType(target) {
      return Object.prototype.toString.call(target).slice(8, -1)
    }
    //实现深度克隆---对象/数组
    function clone(target) {
      //判断拷贝的数据类型
      //初始化变量result 成为最终克隆的数据
      let result, targetType = checkedType(target)
      if (targetType === 'Object') {
        result = {}
      } else if (targetType === 'Array') {
        result = []
      } else {
        return target
      }
      //遍历目标数据
      for (let i in target) {
        //获取遍历数据结构的每一项值。
        let value = target[i]
        //判断目标结构里的每一值是否存在对象/数组
        if (checkedType(value) === 'Object' ||
          checkedType(value) === 'Array') { //对象/数组里嵌套了对象/数组
          //继续遍历获取到value值
          result[i] = clone(value)
        } else { //获取到value值是基本的数据类型或者是函数。
          result[i] = value;
        }
      }
      return result
    }
```

### 思想三
#### 基本类型和引用类型

<strong> 存储方式 </strong>

JavaScript中有两种类型，分别是基本类型和引用类型。其中基本类型就包括Number、String、Boolean、null、undefined、Symbol、BigInt这几种，剩下的（Array、Regex、Object、Function等等）都是引用类型。通常我们创建这两种类型的值之后会使用一个变量来保存它，而对于基本类型的值我们是直接使用对象保存它的值，对于引用类型的值，我们是保存它的引用（在C语言里就是指针，即内存地址）

```JavaScript
let number = 1
let string = 'abc'
let object = { name: 'luwei' }
```

上面声明了三个变量，其中number和string是基本类型的值，而object是引用类型的值。我们从计算机底层来讨论在声明这三个变量的时候计算机都做了什么：

- 程序中的使用到的变量和数据都是在保存在计算机的内存中的，内存又可以分为堆和栈两块区域
- 基本类型的值都是保存在栈空间中的，而引用类型的值是保存在堆空间中的
- 在声明基本类型number和string的时候，计算机上会在栈中开辟出来两个空间，并分别把这两个空间叫做number和string，然后在赋值的时候分别把数字1和字符串abc存入这两个空间内；也就是说，基本类型的值是直接在栈中保存它的值
- 而在声明引用类型的值的时候就比较复杂了，首先在栈中申请一块空间并将它命名成object，然后在对空间中申请一块内存，并且把{name: 'luwei'}这个对象保存在这个堆空间上，最后再把这个堆空间所在的内存地址赋值给栈中的object变量；也就是说，引用类型在声明和赋值给某个变量之后，我们只能通过这个变量拿到这个引用类型的值在内存中的地址，即它的引用（指针）

<strong> 拷贝方式 </strong>
基本类型的拷贝方式

```JavaScript
let number = 1
let string = 'abc'
let number2 = number
let string2 = string
number2 = 3
string2 = 'dcba'
console.log(number, number2) // 1 ,  3
console.log(string, string2) // 'abc' , 'dcba'
```
- 基本类型的值在拷贝时是拷贝它的值，当使用变量number2拷贝了number之后，修改number2的值并不会影响number的值
- 这里要多说一点，注意到string2 = 'dcba'这一句，计算机在执行这个语句时，并不是简单的把栈空间中叫做string2的内存块中存储的值修改为dcba，而是会重新申请一块内存块并命名为string2，再将dcba存入这个内存块；这种现象只有在字符串才会发生，因为存储在栈中的数据大小都是固定的，数字等其他基本类型的重新赋值之后在内存中所占的大小都是一样的，所以不需要重新申请空间，直接修改原有的值就可以。而对于字符串，比如上面的例子，它的长度比之前增加了1，因此原本存储abc的空间是无法存储dcba的，因此编译器在处理字符串的重新赋值时是统一重新申请栈空间。这就是字符串的不可变性（字符串的值是无法被修改的）。

<strong> 引用类型的拷贝方式 </strong>
通过上文的描述，我们知道引用类型的值是保存在堆空间的，而保存引用类型的变量，其实是存在于栈空间的，它保存着引用类型的值在堆空间的内存地址。那么我们要拷贝引用类型的值就会出现两种情况

- 浅拷贝

所谓浅拷贝就是使用一个变量去拷贝一个引用类型在栈中的内存地址
```JavaScript
let object = { name: 'luwei' }
let object2 = object
object2.name = 'LUWEI'
console.log(object) // { name: 'LUWEI' }
```
- 深拷贝

而深拷贝就是指在堆空间中，另外开辟出一个空间，并把原有的堆空间中保存的引用类型的值拷贝到新的空间中来。

```JavaScript
let object = { name: 'luwei' }
let object2 = JSON.parse(JSON.stringify(object))
object2.name = 'LUWEI'
console.log(object) // { name: 'luwei' }
```

#### 实现深拷贝的方式
- 第一种：JSON.parse(JSON.stringify(object))

上面的代码通过JSON.parse(JSON.stringify(object))演示了一个简单的深拷贝，但是这种方式是有缺点的：
```JavaScript
let obj = {
    reg : /^reg$/,
    fun: function(){},
    syb: Symbol('foo'),
    undefined: undefined
};
let copied_obj = JSON.parse(JSON.stringify(obj));
console.log(copied_obj); // { reg: {} }
```
1. 会忽略 undefined
2. 会忽略 symbol
3. 不能序列化函数正则对象等特殊对象
4. 不能处理指向相同引用的情况，相同的引用会被重复拷贝

```JavaScript
let obj = {};
let obj2 = {name:'aaaaa'};
obj.ttt1 = obj2;
obj.ttt2 = obj2;
let cp = JSON.parse(JSON.stringify(obj));
obj.ttt1.name = 'change';
cp.ttt1.name  = 'change';

// 因为obj的 ttt1 和 ttt2都是指向一个同一个对象，所以修改其中一个，另一个也会变，也就是说obj.ttt1 === obj.ttt2
console.log(obj); // { ttt1: {name: "change"}, ttt2: {name: "change"}}

// 而通过这种方式拷贝时，obj2拷贝了两次，丢失了cp.ttt1 === cp.ttt2 的特征
console.log(cp); // {ttt1: {name: "change"}, ttt2: {name: "aaaaa"}}
```

- 第二种：递归拷贝

```JavaScript
function cloneDeep(value) {
  let copied_objs = []; // 用于解决循环引用问题

  function _cloneDeep(value) {
    if (value === null) return null;
    if (typeof value === "object") {
    	// 对象类型的值首先在copied_objs查找是否出现过，如果出现直接返回之前的结果
      for (let i = 0; i < copied_objs.length; i++) {
        if (value === copied_objs[i].source) {
          return copied_objs[i].target;
        }
      }
      let new_value = {};
      // 需要处理数组的情况
      if (Array.isArray(value)) new_value = [];
      copied_objs.push({ source: value, target: new_value });

      Object.keys(value).forEach((key) => {
        new_value[key] = _cloneDeep(value[key]);
      });
      return new_value;
    } else {
      return value;
    }
  }
  return _cloneDeep(value);
}
```
> 使用lodash的测试用例测试通过，TypedArray的相关用例没有通过，上面的代码没有考虑兼容TypedArray类型


