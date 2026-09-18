---
title: webpack
---
[「吐血整理」再来一打Webpack面试题](https://juejin.cn/post/6844904094281236487)
[webpack面试题](https://juejin.cn/post/6844903781847695367)

## Webpack热更新实现原理?
1. Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)
2. 页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端
3. 客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash
4. 修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端
5. 客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档
6. hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新render 组件， 继而实现 UI 无刷新更新。

[彻底搞懂并实现webpack热更新原理](https://blog.csdn.net/sinat_17775997/article/details/102679580)




## webpack 插件开发的流程？(跟谁学)
[Webpack 插件开发如此简单！](https://juejin.cn/post/6844904070868631560)
[揭秘webpack插件工作流程和原理](https://zhuanlan.zhihu.com/p/141447713)
[看清楚真正的 Webpack 插件](https://toutiao.io/posts/1s9kqo/preview)



## 组件库开发单元测试需要测试什么？ 系统测试用什么工具？(跟谁学)
[UI组件库从1到N开发心得-单元测试篇](https://juejin.cn/post/6844903966795366407)
[前端组件单元测试](https://zhuanlan.zhihu.com/p/100555246)
[ui组件如何进行单元测试，该测试那些内容呢](https://segmentfault.com/q/1010000006970956)




## tree-shaking
[Tree-Shaking性能优化实践 - 原理篇](https://juejin.cn/post/6844903544756109319)
[Tree Shaking原理 -【webpack进阶系列】](https://segmentfault.com/a/1190000022194321)





## commonjs 与 esm 的区别
[commonjs 与 esm 的区别](https://juejin.cn/post/6844903861166014478)
[Module和CommonJS的区别](https://zhuanlan.zhihu.com/p/71098263)
[前端模块化——彻底搞懂AMD、CMD、ESM和CommonJS](https://www.cnblogs.com/mqingqing123/p/12164694.html)
[前端模块化](https://fe.rualc.com/note/js-modular.html)






## webpack
[webpack打包原理 ? 看完这篇你就懂了 !](https://segmentfault.com/a/1190000021494964)
[Webpack原理浅析](https://jelly.jd.com/article/5f0de6dad5205e015b87c128)
[webpack打包分析与性能优化](https://zhuanlan.zhihu.com/p/25212283)




## babel ES6 转换 ES5
[babel ES6 转换 ES5 实现原理](https://blog.csdn.net/weixin_44135121/article/details/104161852)
[ES6 代码转成 ES5 代码的实现思路是什么](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/112)
[使用babel把es6语法转换成es5](https://segmentfault.com/a/1190000038331178)





## webpack与rollup的区别和原理
[Webpack vs Rollup](https://juejin.cn/post/6844903735236231175)
[【第九期】Rollup：下一代ES模块打包工具](https://zhuanlan.zhihu.com/p/75717476)
[rollup和webpack](https://segmentfault.com/a/1190000022227140)
[webpack、gulp、rollup、tsc/babel 使用对比](https://segmentfault.com/a/1190000037638760)






## webpack异步加载原理
[由浅至深了解webpack异步加载背后的原理](https://cloud.tencent.com/developer/article/1573508)
[webpack的异步加载原理及分包策略](https://segmentfault.com/a/1190000038180453)


## 热更新模块的实现原理
[轻松理解webpack热更新原理](https://juejin.cn/post/6844904008432222215)
[彻底搞懂并实现webpack热更新原理](https://segmentfault.com/a/1190000020310371)
[webpack 热更新（HMR）实现原理](https://zhuanlan.zhihu.com/p/138446061)




## 对webpack构建做的优化及开发体验有什么。
[三十分钟掌握Webpack性能优化](https://juejin.cn/post/6844903651291447309)
[浅谈 webpack 性能优化（内附 webpack 学习笔记）](https://zhuanlan.zhihu.com/p/139498741)