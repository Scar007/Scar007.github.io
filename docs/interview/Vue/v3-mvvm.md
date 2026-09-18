---
title: MVVM
---
## 你知道Vue3.x响应式数据原理吗？
- Vue3.x改用Proxy替代Object.defineProperty。
- 因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。
- Proxy只会代理对象的第一层，Vue3是怎样处理这个问题的呢？
- 判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。
- 监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。




我们总结一下整个数据绑定建立响应式大致分为三个阶段：
1. 初始化阶段： 初始化阶段通过组件初始化方法形成对应的proxy对象，然后形成一个负责渲染的effect。
2. get依赖收集阶段：通过解析template，替换真实data属性，来触发get,然后通过stack方法，通过proxy对象和key形成对应的deps，将负责渲染的effect存入deps。（这个过程还有其他的effect，比如watchEffect存入deps中 ）。
3. set派发更新阶段：当我们 this[key] = value 改变属性的时候，首先通过trigger方法，通过proxy对象和key找到对应的deps，然后给deps分类分成computedRunners和effect,然后依次执行，如果需要调度的，直接放入调度。





[细致分析，尤雨溪直播中提到 vue3.0 diff 算法优化细节](https://juejin.cn/post/6844904136299773965)
[Vue2.x和Vue3.x渲染器的diff算法](https://co2-2020.github.io/blog/soundcode/vue/dom-diff.html#vue3-x-diff%E7%AE%97%E6%B3%95)


