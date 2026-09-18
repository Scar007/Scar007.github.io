---
publish: false
title: 生命周期
---
## vue的生命周期
### _init_
- initLifecycle/Event，往vm上挂载各种属性
- callHook：beforeCreated：实例刚创建
- initInjection/initState：初始化注入和data响应性
- created：创建完成，属性已经绑定，但还未生成真实DOM
- 进行元素挂载：$el / vm.$mount()
- 是否有template：解析成render function
  - *.vue文件：vue-loader会将\<template>编译成render function
- beforeMount：模板编译/挂载之前
- 执行render function，生成真实的DOM，并替换到DOM tree中
- mounted：组件已经挂载
### update
- 执行diff算法，比对改变是否需要触发UI更新
- flushScheduleQueue
  - watcher.before：触发beforeUpdate钩子——watcher.run()：执行watcher中的notify，通知所有依赖项更新UI
- 触发updated钩子：组件已更新
### actived/ deactivated(keep-alive)
不销毁，缓存，组件激活与失活
### destroy
- beforeDestroy：销毁开始
- 销毁自身且递归销毁子组件以及事件监听
  - remove()：删除节点
  - watcher.reardown()：清空依赖
  - vm.$off()：解绑监听
- destroyed：完成后触发钩子

上面试vue的生命周期的简单梳理，接下来我们直接以代码的形式来完成vue的初始化：
```js
new Vue({})

// 初始化Vue实例
function _init(){
    // 挂载属性
    initLifeCycle(vm);
    // 初始化时间系统，钩子函数等
    initEvent(vm);
    // 编译slot、vnode
    initRender(vm);
    // 触发钩子
    callHook(vm, 'beforeCreate');
    // 添加inject功能
    initInjection(vm);
    // 完成数据响应 props/data/watch/computed/methods
    initState(vm);
    // 添加provide功能
    initProvide(vm);
    // 触发钩子
    callHook(vm, 'created');
    // 挂载节点
    if (vm.$options.el) {
        vm.$mount(vm.$options.el);
    }
}
// 挂载节点实现
function mountComponent(vm) {
    // 获取render function
    if (!this.options.render) {
        // template to render
        // Vue.compile = compileToFunctions
        let { render } = compileToFunctions();
        this.options.render = render;
    }
    // 触发钩子
    callHook('beforeMounte');
    // 初始化观察者
    // render 渲染vdom
    vdom.vm.render();
    // update: 根据diff出的patchs挂载成真实的DOM
    vm._update(vdom);
    // 触发钩子
    callHook(vm, 'mounted');
}
// 更新节点实现
function queueWatcher(watcher) {
    nextTick(flushScheduleQueue);
}
// 清空队列
function flushScheduleQueue() {
    // 遍历队列中所有修改
    for() {
        // beforeUpdate
        watcher.before();
        // 依赖局部更新节点
        watcher.update();
        callHook('updated');
    }
}
// 销毁实例实现
Vue.prototype.$destory = function () {
    // 触发钩子
    callHook(vm, 'beforeDestory');
    // 自身及子节点
    remove();
    // 删除依赖
    watcher.teardown();
    // 删除监听
    vm.$off();
    // 触发钩子
    callHook(vm, 'destoryed');
}
```



## 说一下你对Vue的生命周期的理解
##### 简单回答
- beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed。
- keep-alive 有自己独立的钩子函数 activated 和 deactivated。

##### 复杂回答
生命周期 |
---|
发生了什么 | 
--- |
beforeCreate | 
--- | ---
created | 
--- | ---
beforeMount | 
--- | ---
mounted | 
--- | 
beforeUpdate | 
--- | ---
updated | 
---- | 
beforeDestroy
destroyed
activited keep-alive 专属
deactivated keep-alive 专属




## Vue中组件生命周期调用顺序是什么样的？
- 组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。
- 组件的销毁操作是先父后子，销毁完成的顺序是先子后父。




## 你的接口请求一般放在哪个生命周期中？
- 可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
- 但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
    - 能更快获取到服务端数据，减少页面loading 时间；
    - ssr不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；




## 在什么阶段才能访问操作DOM？
在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。




## 在 Vue 实例中编写生命周期 hook 或其他 option/properties 时，为什么不使用箭头函数 ？
- 箭头函数自已没有定义 this 上下文中。
- 当你在 Vue 程序中使用箭头函数 ( => ) 时，this 关键字病不会绑定到 Vue 实例，因此会引发错误。所以强烈建议改用标准函数声明。







## computed与watch的区别?
[思否](https://segmentfault.com/a/1190000012948175)
[掘金](https://juejin.cn/post/6844903807592169486)
[知乎](https://zhuanlan.zhihu.com/p/99894379)
