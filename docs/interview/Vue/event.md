---
publish: false
title: Vue事件
---
## vue 事件修饰符
- .stop 阻止事件继续传播 即阻止它的捕获和冒泡过程
    ```
    <!-- 阻止单击事件继续传播 -->
    <a v-on:click.stop="doThis"></a>
     ```
- .prevent 阻止默认事件发生 即event.preventdefault():
    ```
    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>
    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>
    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>
    ```
- .capture 添加事件监听器时使用事件捕获模式，即在捕获模式下触发
    ```
    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>
    ```
- .self 当前元素自身时触发处理函数时才会触发函数，原理：是根据event.target确定是否当前元素本身，来决定是否触发的事件/函数
    ```
    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>
    ```
- .once 只触发一次(2.1.4 新增)
    ```
    <!-- 点击事件将只会触发一次 -->
    <a v-on:click.once="doThis"></a>
    ```
- .passive(2.3.0 新增) 不阻止默认事件，提早告诉，提高性能
    ```
    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll">...</div>
    ```
    > .passive 修饰符尤其能够提升移动端的性能。




## Vue事件绑定原理是什么？
- 原生事件绑定是通过addEventListener绑定给真实元素的，组件事件绑定是通过Vue自定义的$on实现的。


