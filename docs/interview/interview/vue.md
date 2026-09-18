## 框架(主Vue)
[Vue问得最多的面试题](https://zhuanlan.zhihu.com/p/53703176)
- MVVM原理<br>
  [vue2 MVVM](https://interview.scar.vip/Vue/mvvm.html)<br>
  [vue3 MVVM](https://interview.scar.vip/Vue/v3-mvvm.html)<br>
  - vue初始化之后发生了什么？<br>
    [执行new Vue时到底发生了什么（一）](https://segmentfault.com/a/1190000019980173)<br>
    [new Vue到底发生了什么（2.0）](https://juejin.cn/post/6844903874612953096)<br>
    Vue._init：
      1. 合并配置项，比如路由、状态管理、渲染函数
        ```js
        new Vue({
          store: store,
          router: router,
          render: h => h(App),
        }).$mount('#app')
        ```
      2. 初始化状态initState(就是将vue实例中的data,method,computed,watch等数据项做进一步的处理，其实就是做代理以及转化成可观测对象。)
      > vue源码中可以看出在initState(vm)执行之前，我们执行了beforeCreate方法，在initState(vm)执行之后，我们执行了created方法。因此在beforeCreate方法中，我们无法直接引用data，method，computed，watch等在initState(vm)中才开始存在的属性。
      3. 数据处理完成之后就将数据挂载到指定的钩子上：vm.$mount(vm.$options.el);<br>

  - render?<br>
    [Vue - 渲染函数render](https://juejin.cn/post/6844903919764635655)

  - vue依赖收集的原理<br>
  [深入解析Vue依赖收集原理](https://juejin.cn/post/6844903702881386504)

  - vue compile过程是怎样？AST作用是什么？<br>
    [Vue3 模板编译原理](https://segmentfault.com/a/1190000023594560)
    1. Parse：解析模板字符串，开始标签<、结束标签</、注释节点<!--、文档声明<!、&#123;&#123;文本、正常的文本字符串，最终生成AST语法树
    2. Transform，对AST进行转换，根据不同的AST节点添加不同的选项参数
    3. Codegen，render生成VNode
    4. Vnode组合成Virtual Dom树，再转换成真实DOM

- diff算法过程<br>
  [详解vue的diff算法](https://juejin.cn/post/6844903607913938951)<br>
  对比新老节点(都是jsx)进行patch算法：
  1. patch接收Vnode和oldVnode两个参数代表新老节点
    > 判断两节点是否一样(key、标签名、是否为注释节点、是否都定义了具体的data，type等)，不一样就直接替换oldVnode，一样就继续检查子节点patchVnode
  2. patchVnode函数
      - 找到对应的真实DOM，称为el
      - 判断Vnode和oldVnode是否为同一个对象如果是，直接return
      - 如果都有文本节点且不相等，则将el的文本节点设置为Vnode的文本节点
      - 如果oldVnode有子节点而Vnode没有，删除el的子节点
      - 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化后添加到el
      - 如果oldVnode和Vnod都有子节点，则再进行下一层比较updateChildren
  3. updateChildren函数
      - 将Vnode子节点的Vchildren和oldVnode的子节点oldChildren提出来
      - Vchildren和oldChildren两个头尾的变量startIndex和EndIndex组合，行程4种比较方式，没有匹配的就比较key，当startIndex>EndIndex表明至少有一个遍历完了，比较结束

  - diff一定会提升性能吗？<br>
    [Vue 为什么要用虚拟 DOM (Virtual DOM)](https://learnku.com/articles/50487)
  - 为何使用虚拟dom<br>
    [虚拟DOM的好处](https://www.jianshu.com/p/9a2fad724371)


- vue如何监听数组的?<br>
  [关于vue中如何监听数组变化](https://segmentfault.com/a/1190000022381071)

- vue生命周期有哪些？<br>
  [Vue.js 技术揭秘-生命周期](https://ustbhuangyi.github.io/vue-analysis/v2/components/lifecycle.html#beforecreate-created)
  - 父子组件生命周期的执行顺序<br>
    [vue 父子组件生命周期执行顺序](https://blog.csdn.net/qyl_0316/article/details/107505447)

- nextTick原理<br>
  [Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)<br>
  [全面解析Vue.nextTick实现原理](https://juejin.cn/post/6844903590293684231)

- Vue.use 原理<br>
  [谈谈Vue.use的原理](https://juejin.cn/post/6859944479223185416)
  判断vue下的installedPlugins数组中是否有该插件了，有的话直接返回，这也是多次调用同一个插件而只会注册一次的原因；
  如果没有该插件的话，就去执行install，最后将这个新的plugin push到installedPlugins数组中，最后返回这个vue构造器
  > Vue.use()可以传参

- computed和watch原理，同时触发computed和watch谁先执行？<br>
  computed:<br>
  [做面试的不倒翁：浅谈 Vue 中 computed 实现原理](https://juejin.cn/post/6844903678533451783)<br>
  [深入理解Vue的computed实现原理及其实现方式](https://juejin.cn/post/6844903606676799501)<br>

  watch:<br>
  [深入理解Vue的watch实现原理及其实现方式](https://juejin.cn/post/6844903605485436941)

  - watch是否进入页面就会监听，想要进入页面就监听应该怎么做？<br>
    [Vue.js中 watch 的高级用法](https://juejin.cn/post/6844903600737484808)

  差异：<br>
  1. 功能上：computed是根据已知的值计算得到一个新值，会根据已知值的变化而变化，可以简化template里&#123;&#123;}}计算等；而watch是监听已经存在且已经挂载到Vue实例上的数据，所以用watch 可以监听data、props等值，同样可以监听computed计算属性的变化，然后执行异步操作
  2. 性能上：computed具有缓存性，第一次执行computed，才会计算新的值，或者当依赖值变化时，会进行计算，如果依赖没有变化时，直接读取缓存不会重新执行函数；而watch则是当数据发生变化便会调用执行函数
  3. 使用上：computed的函数必须要return，watch是用过新旧值做一些特定操作，不是必须return
  4. 场景上：从使用场景来说，computed适用于一个数据被多个数据影响，比如购物车结算；而watch适用于一个数据影响多个数据，比如搜索

- vue-router实现原理<br>
  [前端路由简介以及vue-router实现原理](https://zhuanlan.zhihu.com/p/37730038)<br>
  [Vue番外篇 -- vue-router浅析原理](https://juejin.cn/post/6844903695365177352)

  - vue router 和 vue route 有什么不一样？<br>
    [$router和$route的区别](https://www.cnblogs.com/WindrunnerMax/p/13512144.html)<br>
    [vue中 $router 和 $route 的区别](https://segmentfault.com/a/1190000022666268)<br>

    `this.$route`：当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。<br>
    `this.$router`：全局的 router 实例。通过 vue 根实例中注入 router 实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用其 push(), replace(), go() 等方法。

  - vue-router里hash和history？<br>
    [在SPA项目的路由中，注意hash与history的区别](https://juejin.cn/post/6844904151206330375)<br>
    [vue-router的hash模式和history模式详解](https://juejin.cn/post/6844903816953856007)
  - vue-router中权限管理的实现⽅式与拦截⽅式<br>
    [记录前端用vue-router实现路由拦截（权限控制）](https://blog.csdn.net/weixin_45923100/article/details/109077919)
  
  - keep-alive<br>
  [Vue keep-alive深入理解及实践总结](https://juejin.cn/post/6844903919273918477)

- 插件
  - 如何判断哪些属于vue插件哪些不属于？(×)<br>
    vue插件需要Vue.use()<br>
    [vue开发常用第三方插件总结](http://www.fly63.com/article/detial/3224)
  - vue-router和axios等属于vue插件吗，如何开发一个插件？<br>
    [vue插件开发、文档书写、github发布、npm包发布一波流](https://juejin.cn/post/6844903679162581005)<br>
    [如何开发和发布一个Vue插件](https://www.cnblogs.com/champyin/p/12449310.html)
  
  暴露install方法，Vue.use的时候会执行，然后将插件以$xx的形式挂载到Vue的原型上，比如写一个this.$toast插件
  1. 编写toast.vue模板，import到toast.js文件中
  2. install方法中先利用Vue.extend()创建一个刚才引入的模板的子类，相当于继承了toast模板的构造器。
  3. 然后new一个刚才创建的构造器并且传值
  4. 然后调用这个实例的$mount()方法手动挂载
  5. 最后利用JS的appendChild将$el获取到的真实的DOM添加在body上
  
  编写插件基本就是以上步骤，但是有时候需要发布在npm上：
  1. 可以用Vue-cli生成项目，重点是配置npm脚本(package.json)
    ```js
    // @edu/tcc包的配置
    "lib": "vue-cli-service build --target lib --name tcc --dest lib index.js",
    ```
    ```
    --target：构建的目标
      targetType 有三个选项：lib | wc | wc-async
      lib：库
      wc：web component
      wc-async：异步的 web component

    --name：库或组件的名字
      当入口为单一文件时，name为库或组件的文件名
      当入口为global表达式时，name为每个库或组件文件名字的前缀

    --dest：输出目录
      默认为dist目录，也可以修改为自定义的目录
    ```
  2. 运行后会生成UMD格式的模块(这样别人在 Vue 项目中使用这个插件的时候就不会有两份 Vue 或者出现 Vue 版本冲突的问题，以保证可以更好被独立引用。)<br>
    ```
    生成文件：
    toast.umd.js 一个直接给浏览器或者AMD loader 使用的 UMD 包
    toast.umd.min.js 一个压缩版 UMD 构建版本
    toast.common.js 一个给打包器用的CommonJS包
    ```
  3. 发布前配置package.json中的name和main<br>
    name值是最终包的名字，install和import时就是用这个名字，必须保证全网唯一<br>
    main值是包的入口文件路径(相对当前文件的路径)，必须正确，否则无法被引用<br>
    > 可利用npm link本地测试跑一下包
  4. npm发布
    ```js
    npm add user / npm login 
    npm verson patch(修订版) / minor(次版本) / major(主版本), 还有alpha(内部版本)、beta(公测版本) 等
    npm publish
    ```
  5. 在新项目中npm install，import之后Vue.use

- Vue3新特性<br>
  [Vue3新特性一篇搞懂](https://juejin.cn/post/6844904084512718861)<br>
  [Vue3 中的数据侦测](https://juejin.cn/post/6844903957807169549)
  - vue3的proxy解决了什么问题？
  - vue3中Relfect做什么的？

  基础API:
  - reactive, // 创建响应式数据对象
  - ref, // 创建一个响应式的数据对象
  - toRefs, // 将响应式数据对象转换为单一响应式对象
  - isRef, // 判断某值是否是引用类型<br>
  
  生命周期钩子：
  - beforeCreate ——> setup(替代)
  - created ——> setup(替代)
  - beforeMount ——> onBeforeMount
  - mounted ——> onMounted
  - beforeUpdate ——> onBeforeUpdate
  - updated ——> onUpdated
  - beforeDestroy ——> onBeforeUnmount
  - destroyed ——> onUnmounted
  - errorCaptured ——> onErrorCaptured

  MVVM:
  - Object.defineProperty ——> proxy
    proxy:<br>
      直接使用时其实只代理到了第一层，所以用Reflect.get代理多层的数据结构，从而实现深度监听，如果是对象，则再走一次proxy，从而获得了对对象内部的侦测
      > Reflect.get会返回对象的内层结构<br>
      > proxy数据都会保存在Map中，访问时会直接查找，从而提高性能<br>
      > 为何不用递归进行深度侦测：代码不够优雅、递归proxy会消耗比较大的性能


- 组件之间传值<br>
  [vue中8种组件通信方式, 值得收藏!](https://juejin.cn/post/6844903887162310669)
  1. props/$emit 父子组件<br>
    props: 父->子单项传递(单项数据流) <br>
    $emit: 子->父(v-on回调监听) <br>
  2. $children/$parent 父子组件<br>
    拿到组件实例，访问组件的所有方法和data<br>
    $parent的值是对象<br>
    $children的值是数组<br>
      > 边界：#app上拿$parent得到new Vue()实例，再往上是undefined；$children最底层是空数组<br>
  3. provide/reject 嵌套级组件，不限父子<br>
    依赖注入方式，祖先中provide提供数据，子组件使用的地方reject注入数据
  4. ref/refs<br>
    父组件中获取引用的子组件的实例，访问方法或data
  5. eventBus 任何组件<br>
    eventBus = new Vue()初始化时间总线<br>
    eventBus.$emit发送事件<br>
    eventBus.$on接收事件<br>
    eventBus.off移除监听事件<br>
    > 项目较大时容易造成维护灾难
  6. Vuex 任何组件<br>
    state：store中唯一数据源，只读<br>
    getters：和computed一样，基于state的二次包装，常用作数据筛选计算等<br>
    mutation：commit同步改变state数据，不能处理异步<br>
    actions：dispatch异步提交mutation改变state<br>
    modules：命名空间，各个模块分开定义和操作，便于维护<br>
  7. localStorage/sessionStorage 任何组件<br>
    这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护
      > 注意用JSON.parse() / JSON.stringify() 做数据格式转换 localStorage / sessionStorage可以结合vuex, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.
  8. $attr/$listeners 隔代组件
  
  - vuex<br>
  [说一说vuex使用及其理解？](https://interview.scar.vip/Vue/vuex.html)<br>
  [面试官：请你说一说vuex的五个属性，分别是什么，区别和用途说一下](https://blog.csdn.net/weixin_42554191/article/details/105397179)
    - 按F5刷新数据丢失，怎么处理的？<br>
      [解决vuex页面刷新导致数据丢失问题(高效简单)](https://segmentfault.com/a/1190000038400475)<br>
      答：使用localStorage或者sessionStroage<br>
      使用vuex-along插件(本质还是将数据放入localStorage或sessionStorage中)
      
  
  - provide/inject原理(解释依赖注入)，有何优势和不足？<br>
    [什么是依赖注入，vue的依赖注入如何实现的](https://blog.csdn.net/devincob/article/details/103794671)<br>
    [Vue3时代，你应该全面拥抱依赖注入](https://zhuanlan.zhihu.com/p/351519484)

- mixin<br>
  [VUE的mixin混入解析](https://www.cnblogs.com/goloving/p/13679008.html)
  1. 数据冲突时以组件数据优先
  2. 同名钩子合并为一个数组，mixin对象的钩子在组件自身钩子前调用
  3. 值为对象的选项，如methods、components将合并为同一对象，键名冲突时取组件对象的键值对
  > 慎用全局组件：全局混入用Vue.mixin全局注册，全局混入会影响每个单独创建的Vue实例

- 有做过哪些Vue组件？设计一个vue组件需要考虑什么？<br>
  [react/vue 组件设计方法/原则](https://cloud.tencent.com/developer/article/1710272)<br>
  `单功能原则`: 组件或容器只负责一块UI功能，不要定义多功能组件，会导致组件复杂高、难以复用、难以维护<br>
  `单一数据源原则`: 明确数据来源和去向，不允许一个数据存在多个来源<br>
    尽量保持：
    1. 组件单方面接受props变量，但不改变它
    2. 组件内部维护state，外部组件不改变它


- Vue指令用过哪些？有什么特点？
  - v-model怎么实现的？<br>
    [vue核心面试题：v-model中的实现原理及如何自定义v-model](https://blog.csdn.net/qq_42072086/article/details/108071825)<br>
    value+input的语法糖，利用transformModel进行model转换，transformModel对model属性进行判断，没有prop默认就是value，没有event就是input，然后将值赋给value，给on绑定input事件

  - v-if和v-show有何区别？<br>
    [v-if和v-show的区别](https://juejin.cn/post/6844903767553359885)<br>
    [v-if与v-show的区别](https://www.cnblogs.com/WindrunnerMax/p/13338814.html)<br>
    `v-show`: 条件真假都会编译，添加到DOM中，控制css显示隐藏，适合条件频繁切换的情况，更省性能<br>
    `v-if`: 条件为假什么都不做，为真时局部编译，动态向DOM中添加元素，适合条件不太可能改变的情况，若子组件需要重新执行生命周期，用v-if才能触发

  - v-for为何要加key？<br>
    [Vue的v-for为什么要加key](https://juejin.cn/post/6844904183989026830)<br>
    diff算法中有sameVnode方法，对比key
    - 不加key，key都是undefined，默认相同，那直接就地复用
    - 加key且是唯一值，直接对比key然后做出反应即可，最大利DOM节点对比，提升性能
    - key为index进行4次对比，四条数据都要重新渲染

- 如何修改data里一个多层的数据？为什么？<br>
  [vue中修改data中数据的方法](https://blog.csdn.net/glorydx/article/details/103558326)<br>
  [分析源码系列 - Vue.set / vm.$set 详解](https://blog.csdn.net/Jioho_chen/article/details/107005845)

  修改数组：
  ```js
  this.$set (this.selectedarr, index, option)
  ```
  第一个参数，已经存在data中的数据，要被修改的数组<br>
  第二个参数，要修改的数组下标<br>
  第三个参数，要修改的数组对应下标的值<br>

  修改对象：
  ```js
  //	第一种方法直接改
  this.obj.dengxi = 'dengxi'
  //第二种方法使用vue的实例提供的方法进行操作
  this.$set(vm.obj,'dengxi','dengxi好帅')
  //第三种方法，通过vue构造函数提供的方法来改变
  Vue.set(this.obj,'dengxi','dengxi真的好帅')

  //如果想要将对象中的某一个键值对应的value删掉
  //第一种方法
  //可以通过上面的三种方法,将其设置为空
  //第二种方法
  this.$delete(this.obj,'yangxi')
  //第三种方法
  Vue.delete(this.obj,'dengxi')

  //创建一个新对象，覆盖之前的对象，vue仍能实现更新
  ```
  > vue响应式依赖Object.defindPrototype的get和set，基于此限制，用到Vue.set()，内部循环处理，递归调用，找对最后的非对象或数组后去监听、更新

- vue运行时版本和编译时版本的区别<br>
  [vue.js完整版与vue.runtime.js运行时版的区别](https://zhuanlan.zhihu.com/p/102565974)<br>
  `vue.js完整版`: 提供了模板，将模板转换成HTML，用户端编译<br>
  `vue.runtime.js编译时版本`： 不包含模板，减少了包的体积，实际开发中通过和webpack配合，使用vue-loader将vue组件转换为render h做需要的函数

- .vue文件最后会转换成什么？<br>
  vue-loader编译成js文件

- vue中css怎么做隔离的？<br>
  1. scope<br>
  2. [css 模块化 & 样式隔离](https://juejin.cn/post/6867345501860151309)<br>
    css module：webpack配置css-loader等，options里module设置为true，提供作用域，编译时会将css类名加上唯一的hash<br>
    css in js：在js中写css，简单高效，但违背了js css分离原则，不能预处理
  3. 模块化、组件化命名<br>
    每个特定的组件下都设置基本css前缀，来人为区分
  4. postcss<br>
    [PostCSS 是个什么鬼东西？](https://segmentfault.com/a/1190000003909268)<br>
    会生成节点树AST，通过文件映射去匹配样式

- 抽离的css放在css中还是js中？如何做进一步优化？(...)<br>
  webpack配置js、css抽离

- vue中操作数据需要注意些什么，原因是什么。(...)

- 如何进行Vue和React技术选型<br>
  [【译】前端框架技术选型 React vs. Vue (vs. Angular)](https://juejin.cn/post/6844903858741706765)<br>
  [资深前端架构师对于框架的技术选型](https://zhuanlan.zhihu.com/p/81461207)<br>
  react：上手慢、jsx、强大的背景Facebook支持，安全、稳定、交付较慢，插件多，社区庞大<br>
  vue：上手快，html、js、css分离更符合前端编码风格，更快，更小，更精简，插件少，社区小<br>
  
  业务现状 > 用户体验 > 开发痛点 > 个人习惯
  
  - vue和react虚拟dom的差异<br>
    [VUE、React中虚拟DOM（virtual DOM）技术 VNode及diff算法介绍](https://zhuanlan.zhihu.com/p/136784818)
  - vue与react都解决了什么问题<br>
    [Vue 和 React 的优点分别是什么？](https://www.zhihu.com/question/301860721)

- scope是怎么实现的<br>
  hash