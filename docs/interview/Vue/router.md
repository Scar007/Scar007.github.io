---
publish: false
title: 路由
---
## vue路由hash模式和history模式实现原理分别是什么，他们的区别是什么？
### hash 模式：
- #后面 hash 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面
- 通过监听 hashchange 事件可以知道 hash 发生了哪些变化，然后根据 hash 变化来实现更新页面部分内容的操作。
### history 模式：
- history 模式的实现，主要是 HTML5 标准发布的两个 API，pushState 和 replaceState，这两个 API 可以在改变 url，但是不会发送请求。这样就可以监听 url 变化来实现更新页面部分内容的操作

区别：
- url 展示上，hash 模式有“#”，history 模式没有
- 刷新页面时，hash 模式可以正常加载到 hash 值对应的页面，而 history 没有处理的话，会返回 404，一般需要后端将所有页面都配置重定向到首页路由
- 兼容性，hash 可以支持低版本浏览器和 IE。





## 路由懒加载是什么意思？如何实现路由懒加载？
含义：把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件

实现：
- 结合 Vue 的异步组件和 Webpack 的代码分割功能
  - 可以将异步组件定义为返回一个 Promise 的工厂函数 \(该函数返回的 Promise <br>
  const Foo = () => Promise.resolve({ /* 组件定义对象 */ }) 复制代码
  - 在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 \(spli <br>
  import('./Foo.vue') // 返回 Promise 复制代码
- 结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件
```JavaScript
const Foo = () => import('./Foo.vue') const router = new VueRouter({ routes: [ { path: '/foo', component: Foo } ]}) 复制代码
```
- 使用命名 chunk，和webpack中的魔法注释就可以把某个路由下的所有组件都打包在同个异步块 (chunk) 中
```JavaScript
chunkconst Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue') 复制代码
```




## Vue-router 导航守卫有哪些？
- 全局前置/钩子：beforeEach、beforeResolve、afterEach
- 路由独享的守卫：beforeEnter
- 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave





## vue-router如何保护指定路由安全？
此题是考查项目实践能力，项目中基本都有路由守卫的需求，保护指定路由考查的就是这个知识点。
#### 答题整体思路：
- 阐述vue-router中路由保护策略
- 描述具体实现方式
- 简单说一下它们是怎么生效的

#### 回答范例：
vue-router中保护路由安全通常使用导航守卫来做。

通过设置路由导航钩子函数的方式添加守卫函数。

在里面判断用户的登录状态和权限，从而达到保护指定路由的目的。

具体实现有几个层级：

全局前置守卫beforeEach、路由独享守卫beforeEnter或组件内守卫beforeRo-uteEnter。

以全局守卫为例来说，可以使用router.beforeEach((to,from,next)=>{})方式设置守卫。

每次路由导航时，都会执行该守卫，从而检查当前用户是否可以继续导航。

通过给next函数传递多种参数达到不同的目的，比如如果禁止用户继续导航可以传递next(false)。

正常放行可以不传递参数，传递path字符串可以重定向到一个新的地址等等。

这些钩子函数之所以能够生效，也和vue-router工作方式有关。

像beforeEach只是注册一个hook，当路由发生变化。

router准备导航之前会批量执行这些hooks，并且把目标路由to，当前路由from。

以及后续处理函数next传递给我们设置的hook。

#### 可能的追问：
###### 能不能说说全局守卫、路由独享守卫和组件内守卫区别？
作用范围：
组件实例的获取
```JavaScript
beforeRouteEnter(to,from,next) {
next(vm => {
})
}
```
#### 名称/数量/顺序
- 导航被触发。
- 在失活的组件里调用离开守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。



## 你项目中的路由守卫是怎么做的？
## 前后端路由一样吗？
## 前端路由是用什么方式实现的？





## vue-router中权限管理的实现⽅式与拦截⽅式。
[vue-router实现路由拦截（权限）](https://blog.csdn.net/weixin_45923100/article/details/109077919)
[vue权限管理实现流程](https://segmentfault.com/a/1190000022431839)
[vue实现路由权限 :router.beforeEach实现路由判断页面未登录跳转到登录页面(路由拦截)](https://www.huaweicloud.com/articles/8e393c409c600da1376695807c935a62.html)