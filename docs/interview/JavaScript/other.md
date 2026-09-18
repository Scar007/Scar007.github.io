---
publish: false
title: 其他
---
## eval是做什么的？
它的功能是把对应的字符串解析成JS代码并运行； 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。 由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')');





## 什么是window对象? 什么是document对象?
window对象是指浏览器打开的窗口，是JavaScript的顶级对象，我们创建的所有对象、函数、变量都是 Window 对象的成员，Window 对象的方法和属性是在全局范围内有效的。

document对象是Document对象（HTML 文档对象）的一个只读引用，使我们可以通过脚本对 HTML 页面中的所有元素进行访问，是 Window 对象的一部分，可通过 window.document 属性对其进行访问





## javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？
“use strict”-- 严格模式， ES5添加的一种运行模式，目的是为了是javascript在更严格的条件下运行。

- 使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。
- 默认支持的糟糕特性都会被禁用，比如不能用with，也不能在意外的情况下给全局变量赋值;
- 全局变量的显示声明,函数必须声明在顶层，不允许在非函数代码块内声明函数,arguments.callee也不允许使用；
- 保证代码运行的安全,限制函数中的arguments修改;
- 提高编译器效率，增加运行速度；

优点（设立的目的）:
- 消除js语法的一些不合理，不严谨之处，减少一些怪异行为；
- 消除代码运行的一些不安全之处，保证代码运行安全；
- 提高编译效率，增加运行速度；
- 为未来新版本的javascript做好铺垫；

缺点:<br>
现在网站的js一般都会进行压缩，压缩过程中，有些文件使用了严格模式，有些却没有。这种情况下本来是严格模式的文件，被merge后，这个串就到了文件中间，不仅没有指示严格模式，在压缩后也会浪费字节。






## 说说严格模式的限制
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）







## document load 和document ready的区别？
document load：是在结构和样式，外部js和图片加载完才执行js；

document ready： 是dom树创建完成就执行的方法，原生是没有这种方法的。





## javascript是一种什么样的语言?
- 解释性脚本语言，代码不能进行预编译；
- 主要用来向html页面添加交互行为；
- 可以直接嵌入到html页面，或单独写成js文件。建议单独写成文件，有利于结构和行为分离，利于维护；
- 跨平台性，在绝大多数浏览器支持下，可以在多种平台下运行，例如windows，linux等；






## JavaScript和ASP脚本相比，哪个更快？
一般情况下，javascript会更快。javascript是一种客户端语言，因此它不需要web服务器的协助来执行。另一方面，ASP是服务端语言，因此总是比javascript慢。但是需要注意的是：javascript现在也可以用于服务端语言（例如nodejs）。






## Java和JavaScript之间的区别？
首先，java是一门十分完整，成熟的编程语言；相比之下，javascript是一个可以被引入HTML页面的编程语言。这两种语言并不是完全相互依赖的，而是真对不同的意图而设计的。

其次，java是一种面向对象编程（OOPS）或结构化的编程语言，类似于C++和C；而javascript是客户端脚本语言，它被称为非结构化编程。






## JavaScript中不同类型的错误有几种？
JS的错误类型一般包含六种常见的派生错误以及手动抛出错误类型。

常见的几种错误类型：
- SyntaxError： 语法错误，一般指解析代码时发生的语法错误；
- ReferenceError：引用错误，一般指引用一个不存在的变量时发生的错误。
- TypeError： 类型错误，一般是变量或参数不是预期类型时发生错误。
- EvalError eval()： 函数执行错误，一般指当eval()函数没有被正确执行时，会抛出evalError错误；
- RangeError: 范围错误，一般指当一个值超出有效范围时发生的错误。






## 延迟脚本在JavaScript中的作用
一般情况下，当页面首先加载脚本时，加载期间页面的HTML代码将会暂停解析，直到脚本加载完才能执行。

所以会出现这么一种情况，就是当服务器速度很慢或者脚本很沉重的情况下，会导致网页延迟。在使用Defer时，脚本会延迟执行直到html解析器运行完成。这极大程度上减少了加载时间，提升了显示速度。






## decodeURI（）和encodeURI（）是什么？
encodeURI()用于将URL转为十六进制编码，而decodeURI()用于将编码的URL转换成正常的URL。





## hash（哈希）表是什么？
哈希表（亦称散列表），是根据关键码值直接进行访问的数据结构。也就是说，它通过把关键码映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数也称散列函数，存放记录的数组叫做散列表。





## 列举几条 JavaScript 的基本代码规范
- 不要在同一行声明多个变量
- 如果你不知道数组的长度，使用 push
- 请使用 ===/!== 来比较 true/false 或者数值
- 对字符串使用单引号 ''(因为大多时候我们的字符串。特别html会出现")
- 使用对象字面量替代 new Array 这种形式
- 绝对不要在一个非函数块里声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但是它们解析不同
- 不要使用全局函数
- 总是使用 var 来声明变量，如果不这么做将导致产生全局变量，我们要避免污染全局命名空间
- Switch 语句必须带有 default 分支
- 使用 /**...*/ 进行多行注释，包括描述，指定类型以及参数值和返回值
- 函数不应该有时候有返回值，有时候没有返回值
- 语句结束一定要加分号
- for 循环必须使用大括号
- if 语句必须使用大括号
- for-in 循环中的变量应该使用 var 关键字明确限定作用域，从而避免作用域污染
- 避免单个字符名，让你的变量名有描述意义
- 当命名对象、函数和实例时使用驼峰命名规则
- 给对象原型分配方法，而不是用一个新的对象覆盖原型，覆盖原型会使继承出现问题
- 使用字面量的方式来创建数组、对象，来代替new Array这种形式；
- fon-in循环中的变量，用var关键字说明作用域，防止变量污染；
- 尽可能的用三元表达式代替if..else..条件语句；
- 比较数据类型以下6中情况是false，false、""、0、null、undefined、NaN；其余的都是true；
- 数据类型检测用typeof，对象类型检测用instanceof；
- 异步加载第三方的内容；




## 什么是Polyfill?
polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”,可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。<br>
例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象，
所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，<br>
一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。





## 做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？
html5shiv、Geolocation、Placeholder




## ViewState和SessionState有什么区别?
ViewState：特定于会话中的页面；

SessionState: 特定于可在web应用程序中的所有页面上访问的用户特定数据；






## JavaScript 对象生命周期的理解？
- 当创建一个对象时，JavaScript 会自动为该对象分配适当的内存
- 垃圾回收器定期扫描对象，并计算引用了该对象的其他对象的数量
- 如果被引用数量为 0，或惟一引用是循环的，那么该对象的内存即可回收






## 哪些操作会造成内存泄漏？
JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收
- 未使用 var 声明的全局变量
- 闭包函数(Closures)
- 循环引用(两个对象相互引用)
- 控制台日志(console.log)
- 移除存在绑定事件的DOM元素(IE)





## weakMap and weakSet(若映射和弱集合)
[WeakMap and WeakSet（弱映射和弱集合）](https://zh.javascript.info/weakmap-weakset)
[介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6)




## js中最大的数字
[js中的最大数](https://www.puronglong.com/2017/04/16/js-bigNumber.html)