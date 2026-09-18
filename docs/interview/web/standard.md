---
title: 规范
---
## 如何看待AMD和CommonJS？
浏览器端异步和服务器端同步的模块化编程规范。
CommonJS：是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。该规范的主要内容是，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中，module标识模块本身。

AMD：是全局定义的，立即执行函数提供 module 和 exports 两个外部变量，模块就放在这个立即执行函数里面。模块的输出值放在 module.exports 之中，这样就实现了模块的加载。







## CommonJS与ESM的区别？CSS-Shaking是怎么做的？（美团）