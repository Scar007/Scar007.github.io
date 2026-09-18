---
title: MVVM
---
## MVVM、MVC、MVP的区别？
### MVVM：
- Model-View-ViewModel的缩写，Model代表数据模型，View代表UI组件,ViewModel将Model和View关联起来
- 数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据





## Vue2.x响应式数据/双向绑定原理
- Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。其中，View变化更新Data，可以通过事件监听的方式来实现，所以 Vue数据双向绑定的工作主要是如何根据Data变化更新View。
- 简述：
    - 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。
    - 这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。
    - 每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

- 深入理解：
    - 监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
    - 解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
    - 订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新——这是一个典型的观察者模式
    - 订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
![avatar](https://static.scar.vip/interview-vuepress/image/mvvm.png)




## Proxy 与 Object.defineProperty 优劣对比
- Proxy 的优势如下:
    - Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
    - Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
    - Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
    - Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
- Object.defineProperty 的优势如下:
    - 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。



## v-model是如何实现双向绑定的？
- v-model是用来在表单控件或者组件上创建双向绑定的
- 他的本质是v-bind和v-on的语法糖
- 在一个组件上使用v-model，默认会为组件绑定名为value的prop和名为input的事件




## 说一说你对vue响应式理解
##### 答题思路：
- 啥是响应式？
- 为什么vue需要响应式？
- 它能给我们带来什么好处？
- vue的响应式是怎么实现的？有哪些优缺点？
- vue3中的响应式的新变化

##### 回答范例：
所谓数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。

mvvm框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新。

要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。

以vue为例说明，通过数据响应式加上虚拟DOM和patch算法。

可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。

vue2中的数据响应式会根据数据类型来做不同处理。

如果是对象则采用Object.defineProperty()的方式定义数据拦截；

当数据被访问或发生变化时，我们感知并作出响应；

如果是数组则通过覆盖该数组原型的方法，扩展它的7个变更方法，使这些方法可以额外的做更新通知，从而作出响应。

这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：

比如初始化时的递归遍历会造成性能损失；

新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；

对于es6中新产生的Map、Set这些数据结构不支持等问题。

为了解决这些问题，vue3重新编写了这一部分的实现：

利用ES6的Proxy机制代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api。

初始化性能和内存消耗都得到了大幅改善；

另外由于响应化的实现代码抽取为独立的reactivity包。

使得我们可以更灵活的使用它，我们甚至不需要引入vue都可以体验。




[MVC、MVP、MVVM模式的概念与区别](https://www.cnblogs.com/ranyonsue/p/12090647.html)
[MVC，MVP 和 MVVM 的图示](https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
[MVC、MVP、MVVM，我到底该怎么选？](https://juejin.cn/post/6844903632446423054)