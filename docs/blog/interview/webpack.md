---
publish: false
title: webpack
createTime: 2024/04/06 21:39:01
permalink: /blog/o6ey3a5r/
---

## Webpack
[「吐血整理」再来一打Webpack面试题](https://juejin.cn/post/6844904094281236487)<br>
[webpack面试题](https://juejin.cn/post/6844903781847695367)

- 常用的loader和plugin

- 做过哪些优化<br>
  [一看就懂之webpack高级配置与优化](https://segmentfault.com/a/1190000020320871)<br>
  [浅谈 webpack 性能优化（内附 webpack 学习笔记）](https://zhuanlan.zhihu.com/p/139498741)<br>
  [webpack 做过哪些优化 ?](https://blog.csdn.net/qq_44722915/article/details/109101979)
  
  优化：开发体验优化 和 输出内容优化
  1. 开启多进程压缩文件：plugin如happypack等，thread-loader代替
  2. 各种类型的图片分别配置不同的压缩方案
  3. 做代码分割：optimization->splitChunks
    ```js
    optimization: {
      splitChunks: {}
    }
    ```
  4. 开启缓存：loader配置catch等
  5. 抽离公共代码：optimization->splitChunks->common
    ```js
    optimization: {
      splitChunks: {
        common:{}
      }
    }
    ```
  6. 根据开发和生产环境分别配置：NODE_ENV
  7. 缩小打包区域：exclude/include确定loader范围，noParse指定不需要要解析的库
  8. Tree shaking：将未使用到的代码去掉，做减法。可以用插件，webpack4也提供了内置优化：
    ```js
    optimization: {
      usedExports: true, // 只导出外部使用到的代码
      minimize: true // 开启JS压缩去除未使用的代码
    }
    ```
  9. 开发环境下模块热更新
  10. scope hoisting：optimization->concatenateModules:true，会将关联模块合并，打包的文件更小，运行更快
  11. DLLPlugin：预先编译模块资源，不会变化的第三方模块可以打包一次，后续都直接使用打包的模块文件就好了
  12. 使用最新版本的webpack、npm、node等
  ...


- webpack编译原理，它比grunt、gulp好在哪里？<br>
  [Webpack原理浅析](https://jelly.jd.com/article/5f0de6dad5205e015b87c128)<br>
  [Webpack与Gulp、Grunt区别](https://blog.csdn.net/qq_36671474/article/details/82227369)

  编译：
  1. 初始化参数：根据开发、生产环境配置不同的参数，与基础参数合并得到最终参数
  2. 开始编译：用得到的参数初始化compiler对象，加载所有需要配置的的插件，执行run开始编译
  3. 确定入口：通过entry找到所有入口文件
  4. 编译模板：从入口出发，调用rules下的loader对模板进行翻译
  5. 完成模块编译：loader翻译完模板之后，得到了每个模块被翻译后的内容以及他们之间的依赖关系
  6. 输出资源：根据入口和模块之间的依赖关系，组成一个个包含多模块的chunk，再把chunk转换成一个单独文件加入到输出列表
  7. 输出完成：确定好输出内容后，根据配置确定输出的路径和文件名，将文件内容写入文件系统

  webpack基于模块化打包工具，按需加载，适合SPA<br>
  grunt、gulp基于任务运行，适合小型的，需要快速启动的前端项目

- webpack打包原理<br>
  [webpack打包原理](https://jelly.jd.com/article/5f6413356729c6015293bf18)<br>
  [webpack打包原理 ? 看完这篇你就懂了 !](https://segmentfault.com/a/1190000021494964)

  流程：
  1. 由模块内容利用AST获取模块依赖、浏览器可识别的模块内容
  2. 将模块路径、依赖、内容作为对象，放入全局数组
  3. 根据上一步得到的依赖进行遍历，再次进行步骤1，直到依赖为空
  4. 将获取到的全局数组转换成下一步立即执行函数能用的对象格式，文件路径作为对象的属性，依赖内容作为属性值输出的对象
  5. 将步骤4拿到的对象传入立即执行函数
  6. 在立即执行函数中重写require和exports方法
  7. 当require模块的时候，立即执行模块内容并返回exports对象，实现模块动态插入

- Rollup与webpack的区别<br>
  [rollup和webpack](https://segmentfault.com/a/1190000022227140)<br>
  [为什么说rollup比webpack更适合打包库](https://segmentfault.com/a/1190000038708512)

  区别：
  1. 开发版、生产版、压缩版打包出来的体积相差较小；而webpack相差较大
  2. rollup打包出的体积也比webpack更小
  3. rollup打包出来的js比较简单，可以将js代码编译成你想要的格式；webpack则更多是__webpak_require__工具函数的定义
  4. rollup将资源放在同一个地方，一次性加载；webpack做代码拆分、按需加载

  roolup更适合做只有js，没有其他静态资源的文件

- tree-shaking，具体原理是怎么个？<br>
  [Tree Shaking原理 -【webpack进阶系列】](https://segmentfault.com/a/1190000022194321)<br>
  [Tree-Shaking性能优化实践 - 原理篇](https://juejin.cn/post/6844903544756109319)

  原理：<br>
  开启ScopeHoisting：所有代码打包到一个作用域内，然后使用压缩工具根据变量是否被引用进行处理，删除未被引用的代码；<br>
  未开启ScopeHoisting：每个模块保持自己的作用域，由webpack的treeShaking对export打标记，未被使用的导出不会被webpack链接到exports（即被引用数为0），然后使用压缩工具将被引用数为0的变量清除。（类似于垃圾回收的引用计数机制？）

- webpack如何区分环境<br>
  [重构之路：webpack区分生产环境和开发环境](https://juejin.cn/post/6844903779209314317)
  process.env.NODE_ENV判断环境
  webpack文件分成三种：webpack.base.conf.js、webapck.dev.conf.js、webpack.prod.conf.js


- webpack插件开发流程<br>
  [Webpack 插件开发如此简单！](https://juejin.cn/post/6844904070868631560)<br>
  [揭秘webpack插件工作流程和原理](https://zhuanlan.zhihu.com/p/141447713)
  
  插件运行机制
  1. 插件实例化：new PluginName(options)
  2. 插入动态脚本：读取JS文件名->读取模板HTML->开发替换脚本修改script的src值->插入脚本到模板HTML中
  3. 输出HTML文件：执行脚本->修改script的src值->输出index.html

  一个简单的插件结构：
  ```js
  class HelloPlugin{
    // 在构造函数中获取用户给该插件传入的配置
    constructor(options){
    }
    // Webpack 会调用 HelloPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler) {
      // 在emit阶段插入钩子函数，用于特定时机处理额外的逻辑；
      compiler.hooks.emit.tap('HelloPlugin', (compilation) => {
        // 在功能流程完成后可以调用 webpack 提供的回调函数；
      });
      // 如果事件是异步的，会带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知webpack，才会进入下一个处理流程。
      compiler.plugin('emit',function(compilation, callback) {
        // 支持处理逻辑
        // 处理完毕后执行 callback 以通知 Webpack 
        // 如果不执行 callback，运行流程将会一直卡在这不往下执行 
        callback();
      });
    }
  }

  module.exports = HelloPlugin;
  ```

- 按需加载|懒加载|异步加载的原理<br>
  [按需加载原理分析](https://juejin.cn/post/6847902223629090824)<br>
  [4-12 分割代码按需加载](https://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-12%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD.html)<br>
  [webpack的异步加载原理及分包策略](https://segmentfault.com/a/1190000038180453)<br>
  [webpack模块异步加载原理解析](https://juejin.cn/post/6844904033681948686)
  [揭秘webpack按需加载原理](https://zhuanlan.zhihu.com/p/159216534)

  页面中有的文件暂时不一定用到，希望用的时候再去加载，这就是按需加载。<br>
  懒加载实现的前提是ES6动态的加载模块import，借助函数实现延迟加载代码。比如路由懒加载，可以配置component的时候使用箭头函数动态引入的方式

  异步加载原理：
  一般的方法就是动态创建script标签，然后将src属性指向对应的文件路径。
  1. 开始加载异步js
  2. 定义installedChunks，异步存储js的promise回调
  3. 发起jsonp请求，异步加载js，定义成功和失败的回调
  4. 异步js加载成功后，异步js执行全局被重写的push方法
  5. 在重写的push中执行promise的resolve回调
  6. 执行加载成功回调

  异步的chunk配置：optimization.splitChunks，内置的代码分割策略：
  1. 新的chunk是否被共享或来自node_modules
  2. 新的chunk体积体积是否大于30kb
  3. 按需加载chunk并发请求数量小于等于5个
  4. 页面初始加载时并发请求小于等于3个

- 模块热更新的原理<br>
  [彻底搞懂并实现webpack热更新原理](https://blog.csdn.net/sinat_17775997/article/details/102679580)

  Hot Module Replacement：<br>
  WDS(webpack dev server) 和 浏览器之间维护了一个Websocket长连接，webpack文件变化时，会重新编译，每次编译生成新的hash、已改动的模块的js。webpack会将新的hash通过socket发送给浏览器，浏览器对比hash值，发现不一样的时候回发送AJAX向WDS获取最新资源

- 项目中webpack的配置<br>
  [vue-cli脚手架中webpack配置基础文件详解](https://segmentfault.com/a/1190000014804826)<br>
  [webpack实战（一）：真实项目中一个完整的webpack配置](https://my.oschina.net/lsjcoder/blog/1803141)