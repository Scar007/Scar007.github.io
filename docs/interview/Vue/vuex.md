---
publish: false
title: vuex
---
## 说一说vuex使用及其理解？
此题考查基本能力，能说出用法只能60分。更重要的是对vuex设计理念和实现原理的解读。
#### 回答策略：
1. 首先给vuex下一个定义
2. vuex解决了哪些问题，解读理念
3. 什么时候我们需要vuex
4. 你的具体用法
5. 简述原理，提升层级

#### 首先是官网定义：
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex 也集成到 Vue 的官方调试工具 devtools extension。

提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。——Vuex官方文档<br>
主要包括以下几个模块：
- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

#### 回答范例：

vuex是vue专用的状态管理库。

它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。

vuex主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享。

但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，也会使程序逻辑变得复杂。

vuex通过把组件的共享状态抽取出来，以全局单例模式管理。

这样任何组件都能用一致的方式获取和修改状态。

响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。

vuex并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。

如果我们不打算开发大型单页应用或者我们的应用并没有大量全局的状态需要维护，完全没有使用vuex的必要。

一个简单的store 模式就足够了。反之，Vuex 将会成为自然而然的选择。

引用 Redux 的作者 Dan Abramov 的话说就是：

Flux 架构就像眼镜：您自会知道什么时候需要它。

我在使用vuex过程中有如下理解：

首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；

然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation；

如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。

最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称；

如果子模块有设置namespace，那么在提交mutation和派发action时还需要额外的命名空间前缀。

vuex在实现单项数据流时需要做到数据的响应式。

通过源码的学习发现是借用了vue的数据响应化特性实现的。

它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。





## 什么情况下使用 Vuex？
- 如果应用够简单，最好不要使用 Vuex，一个简单的 store 模式即可
- 需要构建一个中大型单页应用时，使用Vuex能更好地在组件外部管理状态





## Vuex和单纯的全局对象有什么区别？
- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。





## 为什么 Vuex 的 mutation 中不能做异步操作？
- Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
- 每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。





## vuex的action有返回值吗？返回的是什么？
- store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
- Action 通常是异步的，要知道 action 什么时候结束或者组合多个 action以处理更加复杂的异步流程，可以通过定义action时返回一个promise对象，就可以在派发action的时候就可以通过处理返回的 Promise处理异步流程
> 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。





## 为什么不直接分发mutation,而要通过分发action之后提交 mutation变更状态
- mutation 必须同步执行，我们可以在 action 内部执行异步操作
- 可以进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）







## 实现一个简单vuex方法
```js
class Store{
    constructor(options) {
        this.state = options.state

        let mutations = {}
        Object.keys(options.mutations).forEach(key => {
            mutations[key] = payload => {
                options[mutations][key](this.state, payload)
            }
        })

        this.commit = (key, payload) => {
            mutations[key](payload)
        }
    }
}
```


## 如何抉择vuex和eventBus？
[EventBus & Vuex?](https://juejin.cn/post/6844903733256519694)
[vue状态管理机制探究（eventBus vs VUEX）](https://juejin.cn/post/6844904191022858254)


