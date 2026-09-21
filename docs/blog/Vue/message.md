---
publish: false
title: 通信
createTime: 2021/03/07 02:51:18
permalink: /blog/8l52kr0d/
---
## Vue组件通信有哪些方式？
### 父子组件通信
- 事件机制(**父->子props,子->父 $on、$emit)
- 获取父子组件实例 $parent、$children
- ref 获取实例的方式调用组件的属性或者方法
- Provide、inject (不推荐使用，组件库时很常用)
### 兄弟组件通信
- $root
- $parent
- Vuex
- eventBus 这种方法通过一个空的 Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件
> Vue.prototype.$bus = new Vue
### 跨级组件通信
- Vuex
- $attrs、$listeners
- Provide、inject


