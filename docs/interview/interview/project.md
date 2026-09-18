## 项目问题
- 如何搭建的Vue项目？<br>
  [面试官：自己搭建过vue开发环境吗？](https://juejin.cn/post/6844903833160646663)
  
  重构：
  1. `自上而下`先不考虑内部实现，先梳理清楚项目出口、入口，因为这两个口需要对外暴露数据规范的传输。对外求稳。
  2. `由外而内`整体考虑项目的结构、可以根据项目实际情况、结合UI侧、产品侧等一系列情况设计大体结构，包括路由分发、状态管理、请求设计、环境依赖等。
  3. 采用vue-cli(快、结构划分清晰)直接生成项目，然后根据实际情况，重点是划分模块和配置webpack。
      - 模块根据产品功能、UI模块、外部依赖(如神策、sentry等)、路由、状态管理等划分文件结构
      - webpack配置首先分为开发环境dev和生产环境prod、开发和生产分别去配置不同的参数，当然也有一些相同的，cli中把他们放在base里边。

      然后就是对webpack做的一些优化项：[参考之前webpack优化]


- SSR(服务端渲染)?<br>
  [彻底理解服务端渲染 - SSR原理](https://github.com/yacan8/blog/issues/30)

- 项目中页面监控怎么做？<br>
  sentry、nginx...<br>
  [前端面试整理 --- 页面性能和错误监控篇](https://zhuanlan.zhihu.com/p/83802728)

- 前端如何自己做PV、UV统计？<br>
  [前端数据收集（pv/uv）](https://segmentfault.com/a/1190000018586285)<br>
  [PV UV IP 与埋点技术实现](https://juejin.cn/post/6844903955642728456)

- 接口会如何设计？<br>
  [你们前后端分离的接口规范是什么？](https://cloud.tencent.com/developer/article/1526194)

- 前端缓存有哪些？<br>
  http、离线缓存...<br>
  [一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)

- Hybrid怎么做的？除了iframe的src传url之外还有什么别的方法？<br>
  [Hybrid设计与实现](https://segmentfault.com/a/1190000020072575)

- JSBridge怎么交互的？<br>
  [JsBridge使用和原理](https://www.jianshu.com/p/910e058a1d63)

- pptx的包怎么做的？怎么部署的？<br>
- 发布npm包怎么区分各种环境的？<br>
  [如何设计npm包的开发和发布流程](https://zhuanlan.zhihu.com/p/63223004)

- 如何做css、js的提前内置(提前加载)？<br>
  [Web 性能优化：Preload与Prefetch的使用及在 Chrome 中的优先级](https://blog.fundebug.com/2019/04/11/understand-preload-and-prefetch/)

- 项目从创建到最后上线部署的整个过程<br>
  [大公司里怎样开发和部署前端代码？](https://www.zhihu.com/question/20790576)

- 项目中如何做SSO<br>
  [单点登录原理与简单实现](https://www.cnblogs.com/ywlaker/p/6113927.html)

- 静态资源如何做的替换保证用户无感发现版本更新<br>
  [前端工程精粹（一）：静态资源版本更新与缓存](https://www.infoq.cn/article/front-end-engineering-and-performance-optimization-part1)

- 前端性能监控的⼏个衡量指标都有什么<br>
  [蚂蚁金服如何把前端性能监控做到极致?](https://www.infoq.cn/article/dxa8am44oz*lukk5ufhy)

- 某文件在浏览器上设置了强缓存、更新了服务器文件后，如何更新浏览器上的文件？
- 项目优化<br>
  答：项目优化本着`单一职责原则(SRP)`、`最少知识原则(KLP)`、`开放-封闭原则(OCP)`三大原则

  附：<br>
  [JS设计模式](https://www.cnblogs.com/imwtr/p/9451129.html)

- 项目中浏览器强制缓存了，但是服务器资源更改了，这时候应该怎么办？

- 各个项目中自己都充当什么样的角色，做了哪些事情？(...)

- 数字图书馆各项指标
  - 阅读页面打开速度提升了近300%
  - 首页加载从1.3s 到968ms
  - 日活4w左右达到12万
  - 7日留存7-9万
  - 周阅读量从2本达到5本
  - 录音平均得分85以上

  `留存率`，`日活`，`7日留存率`，`周阅读时长`，`录音的准确`，`录音平均得分`
  一个留存率，一个，一个， 图书馆项目 量化指标，用户周阅读时长，用户周阅读书的本书，用户录音次数、录音的准确率，学生录音的平均得分