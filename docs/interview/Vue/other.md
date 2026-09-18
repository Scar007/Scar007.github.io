---
title: 其他
---
## 说说vue和react的异同
##### 同
- 使用 Virtual DOM
- 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

##### 异
- 在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树（除非使用PureComponent/shouldComponentUpdate），在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染
- 在 React 中，一切都是 JavaScript。不仅仅是 HTML 可以用 JSX 来表达，现在的潮流也越来越多地将 CSS 也纳入到 JavaScript 中来处理
- Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的。React 则是选择把这些问题交给社区维护，因此创建了一个更分散的生态系统，所以有更丰富的生态系统
- Vue 提供了CLI 脚手架，能让你通过交互式的脚手架引导非常容易地构建项目。你甚至可以使用它快速开发组件的原型。React 在这方面也提供了create-react-app，但是现在还存在一些局限性
- React Native 能使你用相同的组件模型编写有本地渲染能力的 APP，Vue 和Weex会进行官方合作，Weex 是阿里巴巴发起的跨平台用户界面开发框架，同时也正在 Apache 基金会进行项目孵化，另一个选择是NativeScript-Vue，一个用 Vue.js 构建完全原生应用的NativeScript插件




## 你都做过哪些Vue的性能优化？
- 编码阶段
    - 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
    - v-if和v-for不能连用
    - 如果需要使用v-for给每项元素绑定事件时使用事件代理
    - SPA 页面采用keep-alive缓存组件
    - 在更多的情况下，使用v-if替代v-show
    - key保证唯一
    - 使用路由懒加载、异步组件
    - 防抖、节流
    - 第三方模块按需导入
    - 长列表滚动到可视区域动态加载
    - 图片懒加载
- SEO优化
    - 预渲染
    - 服务端渲染SSR
- 打包优化
    - 压缩代码
    - Tree Shaking/Scope Hoisting
    - 使用cdn加载第三方模块
    - 多线程打包happypack
    - splitChunks抽离公共文件
    - sourceMap优化
- 用户体验
    - 骨架屏
    - PWA
    - 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。





## next()方法是怎么实现的？





## vue依赖收集的原理？
[vue技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html)
[掘金文章1](https://juejin.cn/post/6844903702881386504)
[掘金文章2](https://juejin.cn/post/6844903634891735054)




## new vue都发生了什么？
[new vue总结](https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/new-vue.html#%E6%80%BB%E7%BB%93)





## vue的\<style scoped> 中scoped有CSS属性隔离的作⽤，是怎么做的隔离，抽离的CSS是放在 js⽂件中还是css中？怎么做进⼀步优化？
[Vue中的scoped和scoped穿透](https://segmentfault.com/a/1190000015932467)
[Vue.js中scoped引发的CSS作用域探讨](https://blog.csdn.net/u012443286/article/details/80370450)
[vue中style下scope的使用和坑](https://blog.csdn.net/margin_0px/article/details/83014024)





## nextTick原理
[浅析Vue.nextTick()原理](https://segmentfault.com/a/1190000020499713)
[Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)
[全面解析Vue.nextTick实现原理](https://juejin.cn/post/6844903590293684231)



## computed原理
[vue的computed实现原理](https://segmentfault.com/a/1190000022169550)
[深入理解Vue的computed实现原理及其实现方式](https://juejin.cn/post/6844903606676799501)
[做面试的不倒翁：浅谈 Vue 中 computed 实现原理](https://juejin.cn/post/6844903678533451783)
[搞懂computed和watch原理，减少使用场景思考时间](https://juejin.cn/post/6844903926819454983)
[手摸手带你理解Vue的Computed原理](https://my.oschina.net/u/4346209/blog/4326502)



## watch原理
[深入理解Vue的watch实现原理及其实现方式](https://juejin.cn/post/6844903605485436941)
[手摸手带你理解Vue的Watch原理](https://cloud.tencent.com/developer/article/1684337)
[【Vue原理】Watch - 白话版](https://zhuanlan.zhihu.com/p/53220088)
[这一次 彻底理解Vue的watch实现原理及其实现方式](https://blog.csdn.net/wangweianger/article/details/80307819)
[Vue之watch监听的原理](https://blog.csdn.net/s1879046/article/details/109103067)





## set原理
[Vue.set的使用和原理（分析源码系列）](https://blog.csdn.net/Jioho_chen/article/details/107005845)
[vue双向绑定的原理（使用 set 与 get进行代理） js的一些思考](https://blog.csdn.net/qq_40663787/article/details/104221393)



## vue 与 react
[为什么我们放弃了Vue？Vue和React深度比较](https://ifeve.com/%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E4%BB%AC%E6%94%BE%E5%BC%83%E4%BA%86vue%EF%BC%9Fvue%E5%92%8Creact%E6%B7%B1%E5%BA%A6%E6%AF%94%E8%BE%83/)
[Vue 和 React 的优点分别是什么？](https://www.zhihu.com/question/301860721)




[Vue.js 技术揭秘(各个知识点都有)](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)



## new vue() 都发生了什么？
1. _init() 去 初始化options、Proxy、生命周期、render、vm状态等
2. $mount 
    - 查找挂载元素
    - 获取 template
    - compileToFunctions 得到render函数
    - 再次调用 $mount
3. mountComponent
    - 定义updateComponent
    - _render()
    - _createElement() => VNode
    - 实例化渲染 Watcher
    - 更新数据触发 Watcher 再次执行 updateComponent
4. 得到vue实例
5. 4 update->mountComponent
    - vm._update()
    - diff核心： vm.__patch__ 
    - nodeOps 更新真实dom

-------
Vue工作机制：
1. new Vue，随后进行初始化
2. $mount挂载
3. compile编译
4. render函数建立虚拟DOM
5. 依赖收集，设置监听，跟虚拟DOM匹配patch，结合defineProperty响应式更新
6. 渲染DOM树
--------- 
[new Vue到底发生了什么（2.0）](https://juejin.cn/post/6844903874612953096)




## vue的编译过程是怎样的
什么是编译，为什么要编译：因为使用vue编写的模板语句，html根本不识别，我们通过编译的过程可以进行依赖收集，进行依赖收集以后我们就将data中的数据模型跟视图之间产生了绑定关系（依赖关系），以后如果模型发生变化的时候我们就可以通知这些依赖的地方让它们进行更新，这就是我们执行编译的目的。我们把页面全部编译以后，进行更新操作就可以做到模型驱动视图的变化，这就是vue编译的的过程，这就是它的作用。

拓展：什么是依赖收集？<br>
依赖收集就是对订阅数据变化的Watcher收集的过程。其目的是当响应式数据发生变化，触发它们的setter时，能够知道应该通知哪些订阅者去做相应的逻辑处理。例如，当在template模板中使用到了某个响应式变量，在组件初次渲染的时候，对这个响应式变量而言，应该收集render watcher依赖，当其数据发生变化触发setter时，要通知render watcher进行组件的重新渲染。

## 双向绑定的原理是什么
我们在做双向数据绑定的时候通常会放一个v-model在input元素上，为什么要放v-model？因为我们编译的时候可以解析出v-model，在操作的时候：把当前v-model所属的元素上加了一个事件监听，把v-model指定的事件的回调函数作为input事件监听的回调函数去监听，这样的话，如果input发生变化的时候我们就可以把最新的值设置到vue的实例上，因为vue实例已经实现了数据的响应化，响应化的setter函数会触发界面中所有模型的依赖的更新，会通知所有的依赖进行更新刷新的操作，所以在界面中跟这个数据相关的所有部分就更新了。

