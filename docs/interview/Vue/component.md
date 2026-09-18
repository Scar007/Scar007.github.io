---
publish: false
title: 组件模板
---
## 子组件为什么不可以修改父组件传递的Prop？/怎么理解vue的单向数据流？
- Vue提倡单向数据流,即父级props的更新会流向子组件,但是反过来则不行。
- 这是为了防止意外的改变父组件状态，使得应用的数据流变得难以理解。
- 如果破坏了单向数据流，当应用复杂时，debug 的成本会非常高。



## 说一下v-if和v-show的区别？
- 当条件不成立时，v-if不会渲染DOM元素，v-show操作的是样式(display)，切换当前DOM的显示和隐藏。
- v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；
- v-show 则适用于需要非常频繁切换条件的场景。


## 为什么 v-for 和 v-if 不建议用在一起？
- 当 v-for 和 v-if 处于同一个节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费
- 这种场景建议使用 computed，先对数据进行过滤



## nextTick的实现原理是什么？
[Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)

这道题考查大家对vue异步更新队列的理解，有一定深度，如果能够很好回答此题，对面试效果有极大帮助。
##### 答题思路：
- nextTick是啥？下一个定义
- 为什么需要它呢？用异步更新队列实现原理解释
- 我再什么地方用它呢？抓抓头，想想你在平时开发中使用它的地方
- 下面介绍一下如何使用nextTick
- 最后能说出源码实现就会显得你格外优秀

##### 先看看官方定义：
```JavaScript
Vue.nextTick( [callback, context] )
```
在下次 DOM 更新循环结束之后执行延迟回调。

在修改数据之后立即使用这个方法，获取更新后的 DOM。
```JavaScript
// 修改数据
vm.msg = 'hello'
// DOM 还没有更新
Vue.nextTick(function () {
    // DOM更新了
})
```
##### 回答范例：
nextTick是Vue提供的一个全局API。

由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上。

此时如果想要立即获取更新后的dom状态，就需要使用这个方法。

Vue 在更新 DOM 时是异步执行的。

只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。

这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。

nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。

所以当我们想在修改数据后立即看到dom执行结果就需要用到nextTick方法。

比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可。

我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数。

然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。

这让我明白了为什么可以在nextTick中看到dom操作结果。


#### 另外的回答
- 在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。
- nextTick主要使用了宏任务和微任务。
- 根据执行环境分别尝试采用Promise、MutationObserver、setImmediate，如果以上都不行则采用setTimeout定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。




## 为什么不建议用index作为key?
不建议 用index 作为 key，和没写基本上没区别，因为不管你数组的顺序怎么颠倒，index 都是 0, 1, 2 这样排列，导致 Vue 会复用错误的旧子节点，做很多额外的工作




## 说说你对keep-alive组件的了解
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：
- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式，
    - include 表示只有名称匹配的组件会被缓存
    - exclude 表示任何名称匹配的组件都不会被缓存 
    - 其中 exclude 的优先级比 include 高
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。




## Vue模版编译原理知道吗，能简单说一下吗？
简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段（生成AST树/优化/codegen）：
- 首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。
- Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。
- 编译的最后一步是将优化后的AST树转换为可执行的代码。
> Q： 什么是AST语法

[Vue模板编译原理](https://juejin.cn/post/6863241580753616903)




## 如何扩展某个Vue组件
此题属于实践题，着重考察大家对vue常用api使用熟练度，答题时不仅要列出这些解决方案，同时最好说出他们异同。
##### 答题思路：
按照逻辑扩展和内容扩展来列举，逻辑扩展有：

mixins、extends、composition api；

内容扩展有slots；

分别说出他们使用使用方法、场景差异和问题。

作为扩展，还可以说说vue3中新引入的composition api带来的变化
##### 回答范例：
1. 常见的组件扩展方法有：mixins，slots，extends等
2. 混入mixins是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
```JavaScript
// 复用代码：他是一个配置对象，选项和组件一样
const mymixin = {
    methods: {
        dosomething() {}
    }
}
// 全局混入：将混入对象传入
Vue.mixin = mymixin

// 局部混入：做数组项设置到mixins选项，仅作用于当前组件
const Comp = {
    mixin: [mymixin]
}
```
3. 插槽主要用于vue组件中的内容分发，也可以用于组件扩展。
- 子组件Child

```HTML
<div>
    <slot>这里会被父组件Parent对应的内容替换</slot>
</div>
```
- 父组件Parent

```HTML
<div>
    <Child>来自父组件的内容</Child>
</div>
```
如果要精确分发到不同位置可以使用具名插槽，如果要使用子组件中的数据可以使用作用域插槽。
4. 组件选项中还有一个不太常用的选项extends，也可以起到扩展组件的目的

```JavaScript
// 扩展对象
const myextends = {
    methods: {
        dosomething() {}
    }
}
// 组件扩展：做数组设置到extends选项，仅作用于当前组件
// 跟混入的不同是因为它只能扩展单个对象
// 另外如果和混入的发生冲入，该选项优先级更高
const Comp = {
    extends: myextends
}
```
5. 混入的数据和方法不能明确判断来源且可能和当前组件内变量产生命名冲突。

vue3中引入的composition api，可以很好解决这些问题。

利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据。

然后在setup选项中有机组合使用。 如：

```JavaScript
// 复用逻辑1
function useX () {}
// 复用逻辑2
function useY () {}
// 逻辑组合
const Comp = {
    setup () {
        const {x} = useX()
        const {y} = useY()
        return {x,y}
    }
}
```



## v-for 为什么需要key
[key](https://cn.vuejs.org/v2/api/#key)

为了给 Vue 一个提示，以便它能跟踪每个节点的身份

key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误




## v-if 和 v-for 为何不能一起使用
https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81

当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中




## Vue.extend方法你用过吗？它能用来做组件扩展吗？
[Vue.extend 编程式插入组件](https://juejin.cn/post/6844903998672076813)
[vue.extend与vue.component区别](https://segmentfault.com/a/1190000021185841)




## vue中如何实现slot中的数据内容和⼦组件通讯， slot与slot-scope有什么区别？
[思否](https://segmentfault.com/a/1190000012996217)
[简书](https://www.jianshu.com/p/3b8508fed48c)
[csdn](https://blog.csdn.net/sinat_36521655/article/details/103245743)





## vue中provide与inject可以实现什么功能?什么叫依赖注入？如何理解依赖注入的优势？
[掘金1](https://juejin.cn/post/6844903806166106119)
[掘金2](https://juejin.cn/post/6844903989935341581)
[思否](https://segmentfault.com/a/1190000020954324)


[文章](https://juejin.cn/post/6844904071657160717)
[文章](https://segmentfault.com/a/1190000020320255)
