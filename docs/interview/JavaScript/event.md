---
publish: false
title: 事件相关
---

## focus/blur 与 focusin/focusout 的区别与联系?
1. focus/blur 不冒泡，focusin/focusout 冒泡
2. focus/blur 兼容性好，focusin/focusout 在除 FireFox 外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在 FireFox 下使用事件捕获 elem.addEventListener('focus', handler, true)
3. 可获得的焦点：
  - window
  - 链接被点击或键盘操作
  - 表单空间被点击或键盘操作
  - 设置tabindex属性的元素被点击或键盘操作




## for...of、for...in、forEach、map 的区别？
#### for of
- 具有iterator接口，就可以用for...of循环遍历它的成员(属性值)。for...of循环可以使用的范围包括数组、Set 和 Map结构、某些类数组的对象、Generator对象、字符串等。
- for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。对于普通的对象，for...of结构不能直接使用，会报错，必须部署了Iterator接口后才能使用。
- 可以中断循环。
#### for...in
- 遍历对象自身的和继承的可枚举的属性，不能直接获取属性值。
- 可以中断循环。
#### forEach
- 只能遍历数组
- 不能中断
- 没有返回值(或认为返回值是undefined)
#### map
- 只能遍历数组
- 不能中断
- 返回值是修改后的数组





## 什么是iterator？

## 什么是generator？





## 什么是事件循环 (event loop)?
javascript是单线程执行的，从上到下一次运行。在js中分为两个任务，宏任务和微任务。一般情况下，首先执行的是宏任务（就是通常说的第一时间执行所有同步代码），遇到微任务时，先加入队列，宏任务执行完毕再执行微任务。微任务执行完毕之后再往下执行宏任务，执行完后再次执行所有微任务。

简单的理解就是： 宏任务-> 微任务-> 宏任务 ->微任务；








## 什么是事件委托以及冒泡事件和默认事件如何阻止？
概念：<br>
事件冒泡是指嵌套最深的元素触发一个事件，然后这个事件顺着嵌套顺序在父元素上触发。<br>
事件委托，是利用事件冒泡原理，让自己所触发的事件，让其父元素代替执行。

阻止冒泡的方式：
- event.cancelBubble = true
- event.stopPropgation()（低于IE9）

阻止默认事件的方式：
- e.preventDefault()
- return false;





## Javascript的事件流模型都有什么?
“事件冒泡”： 当触发一个节点的事件时，会从当前节点开始，依次触发其祖先节点的同类型事件，直到DOM根节点。（逐级向上）

“事件捕获”： 当触发一个节点的事件时，会从DOM根节点开始，依次触发其子类节点的同类型事件，直到当前节点自身。（逐级向下）

“DOM事件流”： dom同时支持两种事件模型，但捕获性事件先开始，从document开始也结束于document，dom模型的独特之处在于文本也可以触发事件。简单的说分为三个阶段：事件捕捉， 目标阶段， 事件冒泡






## 我们给一个DOM同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？
按照W3C的标准，先发生捕获事件，后发生冒泡事件。<br>
所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件<br>
addEventListener()最后的Boolean值：<strong>true表示捕获，false表示冒泡。</strong>
```js
var btn = document.querySelector('button');
var div = document.querySelector('div');

btn.addEventListener('click', function(){
    console.log('bubble','btn');
},false);
btn.addEventListener('click', function(){
    console.log('capture','btn');
},true);

div.addEventListener('click', function(){
    console.log('bubble','div');
},false);
div.addEventListener('click', function(){
    console.log('capture','div');
},true);
```





## javascript中有几种定时器以及其如何工作?
定时器用于在设定的时间执行一段代码，或者在给定的时间间隔内重复该代码。通过函数setTimeout、setInterval和clearInterval来完成。

setTimeout（function， delay）函数用于移动在所述延迟之后调用特定功能的定时器；<br>
setInterval（function，delay）函数用于在提到的延迟中重复执行给定的功能，只有在取消时才能停止；<br>
clearInterval（id）函数指示定时器停止；<br>

> 注意： 定时器在一个线程内运行，因此事件可能需要排队等待执行；






## setTimeout倒计时为什么会出现误差？
setTimeout()只是将事件插入了“任务队列”，必须等当前执行栈代码执行完，主线程才会去执行它指定的回调函数。要是当前代码消耗时间很长，也有可能要等很久，所以并没有办法保证回调函数一定会在setTimeout()指定的时间执行。所以，setTimeout()的第二个参数表示的是最少时间，并非是确切时间。

HTML5标准规定了setTimeout()的第二个参数的最小值不得小于4ms，如果低于这个值，则默认为4ms。在此之前，老版本的浏览器将最短时间设置为10ms。另外，对于那些DOM的变动(尤其是设计页面重新渲染的部分)，通常是间隔16ms执行。这时使用requestAnimationFrame()的效果要好于setTimeout();







## IE和DOM事件流的区别
- 从执行顺序看： IE采用的是冒泡型事件，而DOM是先捕获后冒泡事件；看个栗子：
```html
<body>
  <div>
    <button>点击</button>
  </div>
</body>

// 冒泡型事件模型： button->div->body (IE事件流)
// 捕获型事件模型： body->div->button (Netscape事件流)
// DOM事件模型： body->div->button->button->div->body (先捕获后冒泡)
```
- 参数方面看，低版本的ie没有回调函数，只能进行冒泡；
- 从第一个参数是否加"on"问题看,低版本IE不支持addEventListener(),支持attachEvent,第一个参数需要加on；
- 从this的指向问题看， IE指向windows,不指向触发的函数；






## W3C事件的 target 与 currentTarget 的区别？
- target 只会出现在事件流的目标阶段
- currentTarget 可能出现在事件流的任何阶段
- 当事件流处在目标阶段时，二者的指向相同
- 当事件流处于捕获或冒泡阶段时：currentTarget 指向当前事件活动的对象(一般为父级)

