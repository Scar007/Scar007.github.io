---
publish: false
---

## JS
- 浏览器线程、进程<br>
  [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)<br>
  浏览器是多进程的，打开一个Tab页，相当于创建了一个独立的浏览器进程(浏览器有自己的优化机制，所以每一个Tab标签对应一个进程并不一定是绝对的)。
    
    浏览器进程包括：
    1. Browser进程
        - 负责页面显示、用户交互(前进后退等)
        - 负责页面管理、创建和销毁其他进程
        - 资源管理、下载
        - 将Renderer进程得到的Bitmap渲染到用户界面上
    2. 第三方插件进程
        - 每种类型插件对应一个进程，仅当使用该插件时才创建
    3. GPU进程
        - 最多一个，用于3D绘制
    4. 浏览器渲染进程
        - 默认每个Tab页面一个进程，互不影响，主要用于页面渲染、脚本执行、事件处理等

    浏览器多进程的优势：
    1. 避免单个页面崩溃影响整个浏览器
    2. 避免第三方插件崩溃影响整个浏览器
    3. 多进程充分利用
    4. 方便使用沙盒模型隔离插件等进程，提高浏览器稳定性


  - web-worker原理、使用场景<br>
    [JavaScript 工作原理之七－Web Workers 分类及 5 个使用场景](https://segmentfault.com/a/1190000014938305)

  - service-worker原理、使用场景<br>
    [Service Worker学习与实践（一）——离线缓存](https://segmentfault.com/a/1190000016446125?utm_source=sf-similar-article)<br>
    [JavaScript 工作原理之八－Service Workers，生命周期及其使用场景](https://segmentfault.com/a/1190000015035372)

  - 事件循环、宏任务、微任务<br>
    [阮一峰 JavaScript 运行机制详解：再谈Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)<br>
    [JS执行机制](https://interview.scar.vip/JavaScript/run.html#js%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6)

  - URL之后都发生了什么？（页面渲染原理 / 浏览器工作原理）<br>
    [从浏览器地址栏输入url到显示页面的步骤](https://interview.scar.vip/browser/url.html#%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%B0%E5%9D%80%E6%A0%8F%E8%BE%93%E5%85%A5url%E5%88%B0%E6%98%BE%E7%A4%BA%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%AD%A5%E9%AA%A4)<br>
    [从输入URL到页面展示，你想知道些什么？](https://juejin.cn/post/6844903616101220366)

  - 为什么JS要设计成单线程模式<br>
    [为什么javascript是单线程](https://blog.csdn.net/baidu_24024601/article/details/51861792)

- DNS<br>
  - DNS解析过程<br>
    [DNS原理及其解析过程](https://www.zhihu.com/question/23042131)
    
  - DNS有没有缓存？获取流程是什么？<br>
    [一次dns缓存引发的惨案](https://www.cnblogs.com/ityouknow/p/6380603.html)

- CDN(Content Delivery Network / 内容分发网络)部署过程<br>
  - 为何要使用CDN，会有何隐患

  [CDN基本工作过程](https://www.cnblogs.com/shytong/p/5456698.html)<br>
  [关于CDN的原理、术语和应用场景那些事](https://www.sohu.com/a/409962893_612370)

- Http1、Http2、Https、Websocket<br>
  [网络协议](https://interview.scar.vip/network/HTTP.html#%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8B%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE)
  - Websocket会有信息丢失的情况吗？为什么？<br>
    [廖雪峰WebSocket](https://www.liaoxuefeng.com/wiki/1022910821149312/1103303693824096)<br>
    [websocket中发生数据丢失_什么是WebSocket，它与HTTP有何不同？](https://blog.csdn.net/weixin_39639518/article/details/112450513)<br>
    [理解WebSocket心跳及重连机制（五）](https://www.cnblogs.com/tugenhua0707/p/8648044.html)

  - Https安全吗？<br>
    [用了HTTPS就安全了吗？HTTPS 会被抓包吗？](https://cloud.tencent.com/developer/article/1748862)

  - TCP-IP滑动窗口<br>
    [TCP-IP详解：滑动窗口（Sliding Window）](https://blog.csdn.net/wdscq1234/article/details/52444277)<br>
    [30张图解： TCP 重传、滑动窗口、流量控制、拥塞控制](https://www.cnblogs.com/xiaolincoding/p/12732052.html)

  - 网络状态码及使用场景<br>
    [HTTP状态码大全](https://www.huaweicloud.com/articles/369ee384fcffe3f4edf0313d12ab0a9e.html)

  - 浏览器缓存<br>
    [浏览器缓存](https://zhuanlan.zhihu.com/p/60950750)<br>
    [彻底理解浏览器的缓存机制](https://juejin.cn/post/6844903593275817998)

- JS数据类型<br>
  - 如何判断数据类型<br>
  - typeof null 返回什么？为什么？<br>
  - null和undefined的区别？<br>
  
  [JS数据类型](https://interview.scar.vip/JavaScript/dataType.html)

- 原型链<br>
  [JS原型及原型链解说](https://www.scar.vip/%e5%89%8d%e7%ab%af/%e6%90%9e%e6%87%82js%e5%8e%9f%e5%9e%8b%e5%92%8c%e5%8e%9f%e5%9e%8b%e9%93%be/)<br>
  [题目考察](https://interview.scar.vip/JavaScript/proto.html)

- 作用域<br>
  [深入理解 JavaScript 作用域和作用域链](https://blog.fundebug.com/2019/03/15/understand-javascript-scope/)<br>
  [作用域](https://interview.scar.vip/JavaScript/scope.html)

- 跨域问题，解决跨域<br>
  [跨域及解决方案](https://interview.scar.vip/JavaScript/CORS.html)

- ES6新增<br>
  - es6 es7 ES.next知道的特性<br>

  - ES6的class和构造函数有何区别？<br>
    [ES6 的 class 和构造函数的区别](https://blog.csdn.net/msjhw_com/article/details/107331588)
  
  - Class类<br>
    [Class类](https://www.liaoxuefeng.com/wiki/1252599548343744/1264799402020448)
    - class中的constructor和super<br>
      [理解 es6 class 中 constructor 方法 和 super 的作用](https://juejin.cn/post/6844903638674980872)

  - symbol用来干什么？怎么用？最重要的两个作⽤？<br>
    [「每日一题」JS 中的 Symbol 是什么](https://zhuanlan.zhihu.com/p/22652486)<br>
    [理解和使用ES6中的Symbol](https://cloud.tencent.com/developer/article/1191039)

  - Reflect<br>
    [es6 Reflect对象详解](https://www.cnblogs.com/kdcg/p/9139273.html)

  - set和map<br>
    [Map和Set](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024181109440)

  [ES6新特性](https://juejin.cn/post/6844903831977852936)<br>
  [ES6、ES7、ES8、ES9、ES10新特性一览](https://juejin.cn/post/6844903811622912014)

- 什么是面向对象(OOP)，面向对象的三大特点？OOP与函数编程的差异和区别<br>
  [OOP面向对象三大特点](https://blog.csdn.net/mogigo00/article/details/55253212)<br>
  [函数式编程与面向对象编程的比较](https://blog.csdn.net/hujutaoseu/article/details/70162384)

- JS设计模式<br>
  [JavaScript中常见的十五种设计模式](https://www.cnblogs.com/imwtr/p/9451129.html)

- promise使用及实现<br>
  - promise.then(fn1, fn2) 与 promise.then(fn1).catch(fn2) 的区别
  - Promise.resolve ⼀定返回 Fullfill 状态嘛？

  [图解 Promise 实现原理（一）—— 基础实现](https://zhuanlan.zhihu.com/p/58428287)<br>
  [图解 Promise 实现原理（二）—— Promise 链式调用](https://zhuanlan.zhihu.com/p/102017798)<br>
  [图解 Promise 实现原理（三）—— Promise 原型方法实现](https://zhuanlan.zhihu.com/p/102018239)<br>
  [图解 Promise 实现原理（四）—— Promise 静态方法实现](https://zhuanlan.zhihu.com/p/102018323)

- 什么是组件化、模块化<br>
  [组件化和模块化有什么区别？](https://zhuanlan.zhihu.com/p/98682826)<br>
  [聊聊工程级别的组件化、插件化 以及 模块化](https://cloud.tencent.com/developer/article/1336167)

- this问题(ES5this 和 ES6this)<br>
  [ES5和ES6的this](https://juejin.cn/post/6844903545544835080)<br>
  [this问题总结](https://www.scar.vip/%E5%89%8D%E7%AB%AF/javascript%E4%B8%AD%E7%9A%84this%E6%8C%87%E5%90%91%E9%97%AE%E9%A2%98%E6%80%BB%E7%BB%93/)<br>
  [40道this面试题](https://juejin.cn/post/6844904083707396109)

- generator函数<br>
  [Generator 函数的含义与用法](http://www.ruanyifeng.com/blog/2015/04/generator.html)

- 闭包<br>
  [闭包](https://interview.scar.vip/JavaScript/closure.html)

- onclick 和 addEventListener有什么区别？<br>
  [onclick和addEventListener的区别](https://www.jianshu.com/p/bfaa963f547c)

- 事件捕获、冒泡<br>
  [事件相关](https://interview.scar.vip/JavaScript/event.html)

- cookie、localStorage、sessionStorage、session<br>
  [cookie、localStorage、sessionStorage、session](https://interview.scar.vip/JavaScript/storage.html)
  - samesite？<br>
    [Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
  
  - ajax如何携带cookie?<br>
    withCredentials:true

- CommonJS 和 ESM等规范<br>
  [深入学习CommonJS和ES6模块化规范](https://zhuanlan.zhihu.com/p/346405395)

  CommonJS:
  1. 同步加载整个模块，运行时加载，加载完成后才能用，适用于Node
  2. 每一个js文件都代表一个模块
  3. 使用module.exports导出，require引入
      - module.exports导出的如果是基本数据类型则是对直接赋值一份数据给引用方，如果是复杂数据类型则是浅拷贝数据给引用方
      - require动态加载，具有缓存特性，如果一个文件里边多次引用，那后边的都是拿取前边的缓存
  4. 默认非严格模式
  5. this指当前模块

  ESM (ES6 Module):
  1. 编译时输出接口，可以单独加载其中某个方法
  2. 一个js文件代表一个模块
  3. 使用export导出，import导入，但是导入导出的变量名必须一致
      - 导出的是值的引用
      - import 具有提升效果，在import之前调用也可以
      - 后续处了export default语法糖，不用每次去对应变量名了
  4. 默认严格模式
  5. this是undefined

- 发布订阅模式和观察者模式<br>
  [观察者模式与订阅发布模式的区别](https://www.cnblogs.com/onepixel/p/10806891.html)<br>
  [观察者模式和发布订阅模式有什么不同？](https://www.zhihu.com/question/23486749)

- 静态资源缓存策略有哪些？前端如何做缓存？缓存有哪几种？<br>
  [Web静态资源缓存及优化](https://zhuanlan.zhihu.com/p/30780216)
  - PWA原理，解决了什么问题？体验有何不同？<br>
    [现代化 Web 开发实践之 PWA](https://www.infoq.cn/article/js2oc7ugfjdjdgjldars)<br>
    答：manifest.json文件做图标、弹窗等缓存处理<br>
      service worker离线存储，包含下载、安装、激活等一系列生命周期<br>
      Push API做消息推送<br>

- Array.prototype.sort 内部使用的是什么排序算法<br>
  [JS-数组sort方法用的是哪种排序算法](https://www.jianshu.com/p/0ddbc3c8f683)

- post和get请求的区别<br>
  [都 2019 年了，还问 GET 和 POST 的区别](https://blog.fundebug.com/2019/02/22/compare-http-method-get-and-post/)<br>

- async/await原理<br>
  [async/await 原理及执行顺序分析](https://juejin.cn/post/6844903988584775693)

- 如何排查前端JS内存泄漏<br>
  [javascript典型内存泄漏及chrome的排查方法](https://segmentfault.com/a/1190000008901861)

- 0.1 + 0.2 = 0.3 的问题，出现的原因是什么，如何解决。<br>
  [为什么 0.1 + 0.2 !== 0.3？如何解决这个问题？](https://blog.csdn.net/mubo970901/article/details/108052108)

- JS 数字可表⽰的最⼤值是多少，⼤数问题如何处理？<br>
  [js中的最大数](https://www.puronglong.com/2017/04/16/js-bigNumber.html)

- 单页应用(SPA)的优缺点？如何实现页面切换？页面切换时会每次都请求新的数据吗？<br>
  [彻底理解单页面应用和多页面](https://www.jianshu.com/p/4ac01b0b4168)

- for-in，for-of，forEach的区别<br>
  [for、forEach、for...of、for...in 的区别与比较](https://blog.csdn.net/csdn_yudong/article/details/85053698)<br>
  [for...of、for...in、forEach、map 的区别？](https://interview.scar.vip/JavaScript/event.html#for-of%E3%80%81for-in%E3%80%81foreach%E3%80%81map-%E7%9A%84%E5%8C%BA%E5%88%AB)

- 高阶函数<br>
  [【译】理解JavaScript的高阶函数](https://juejin.cn/post/6844903892124172301)

- 什么是堆栈溢出？如何解决？<br>
  [Javascript中递归造成的堆栈溢出及解决方案](https://www.cnblogs.com/cuew1987/p/4122856.html)<br>
  [vue项目中出现堆栈溢出](http://www.zyiz.net/tech/detail-113554.html)

