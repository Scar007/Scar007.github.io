---
title: mixin
---
## 什么是 mixin ？
- Mixin 使我们能够为 Vue 组件编写可插拔和可重用的功能。
- 如果你希望再多个组件之间重用一组组件选项，例如生命周期 hook、 方法等，则可以将其编写为 mixin，并在组件中简单的引用它。
- 然后将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优化于组件自已的 hook。





## mixin原理
[vue mixins（混入）遇到的坑以及原理分析](https://www.jianshu.com/p/46d0fc69f607)
[【Vue原理】Mixin - 白话版](https://zhuanlan.zhihu.com/p/53491958)
[【Vue原理】Mixins - 源码版](https://zhuanlan.zhihu.com/p/62729974)
[Vue.mixin Vue.extend(Vue.component)的原理与区别](https://www.w3xue.com/exp/article/201811/10875.html)