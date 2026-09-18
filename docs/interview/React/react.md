---
publish: false
title: React
---
react面试题：
- https://blog.csdn.net/qq_16546829/article/details/137056845<br>
- https://juejin.cn/post/7348651815759282226
- https://juejin.cn/post/6959425716865744933?from=search-suggest

## 说说React，为什么选择React？
### React特点
1. 高效、虚拟DOM，最大限度地减少与DOM的交互：
  - 浏览器在渲染网页时，会先将HTML文档解析并构建DOM树，然后与CSSOM树生成RenderObject树，最后渲染成页面。浏览器中渲染引擎和JavaScript引擎是分离的，渲染引擎会提供一些接口给JavaScript调用，它们二者通信是通过桥接的，性能其实是很差的。
  - 以往，为了优化性能通常采用的办法是减少DOM操作次数。而React提出了一个新的思路就是虚拟DOM：组件的HTML结构不再是直接生成DOM，而是映射生成虚拟的JavaScript DOM结构，React通过diff算法将最小变更写入DOM中，从而减少DOM的实际次数，提升性能。
2. 服务器端渲染
  - React提供开箱即用的服务器端渲染，服务器端渲染解除了服务器端对浏览器的依赖，它会将“可视”部分先渲染，然后再交给客户端做渲染。
3. 组件化编码
  - React 的一切都是基于组件的。可以通过定义一个组件，然后在其他的组件中，可以像HTML标签一样引用它。说得通俗点，组件其实就是自定义的标签；通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
4. 声明式设计
  - React采用声明范式，函数式编程，可以轻松描述应用。
5. 灵活
  - React可以与已知的库或框架很好地配合。
6. JSX
  - JSX 是 JavaScript 语法的扩展。React开发不一定使用 JSX ，但我们建议使用它。
7. 单向响应的数据流
  - React 实现了单向响应的数据流，数据是自顶向下单向流动的，即从父组件到子组件，这种原则让组件之间的关系变得简单可预测；props作为外部接口、state作为内部状态。






## 虚拟DOM的Diff算法，谈谈你对它的理解
React的Diff算法巧妙的使用了试探法将复杂度为O（n^3）的数差异比较算法转换成O(n)复杂度的问题；

该算法基于两个假定：
- 相同类的两个组件将会生成相似的树形结构，而不同类的两个组件将会生成不同的树形结构；
- 可以为元素提供唯一的标识，确保该元素在不同的渲染过程中保持不变。

具体实现细节：
1.（树形结构的比较）即首先检查两个节点的差异
2. 节点类型不同时
  - React会把它们当做两个不同的字树，导致直接移除之前的那颗子树，然后创建并插入之前的那颗子树
  - 优点：巧妙的避开了对树形结构的大量差异检测，然后关注与相同的部分，实现了快速而又精确的差异检测逻辑；
  - 缺陷：如果两个子树具有相似的结构，即顶节点不同，子节点结构相同，这时本来只需要对不同的顶节点进行删除插入操作，但是React会将整个子树都删除然后从新构建插入


## 对于react的理解
React是靠数据驱动视图改变的一种框架，它的核心驱动方法就是用其提供的setState方法设置state中的数据，从而驱动存放在内存中的虚拟DOM树的更新

更新方法就是通过diff算法比较旧的虚拟dom和新的虚拟dom之间的变化，然后批处理这些改变


遵循组件设计模式，声明式编程规范、函数式编程概念，以使前端应用程序更高效

虚拟dom来有效的操作dom，遵循从高阶组件到低阶组件的单向数据流


1. 声明式编程：React采用声明式编程规范，允许开发者描述UI应该呈现的状态，而非具体的操作步骤。这种抽象简化了开发过程，并且有利于React在内部执行高效的DOM更新

2. 虚拟DOM：React引入了虚拟dom的概念，即在内存中维护一个与实际dom相对应的数据结构。每当数据的结构变化时，React首先更新虚拟dom，然后通过高效的diff算法找出最小化dom更新操作，再将这些变化反应到实际dom上，从而极大提升了渲染性能

3. 组件化：React强调组件化开发，鼓励将UI拆分成可复用的独立单元，组件具有明确的输入(Props)和内部状态(state)，使代码易于组织和测试

4. 单向数据流和可预测性：React推崇单向数据流的设计理念，数据从父组件流向子组件，通过props传递，而子组件通过回调函数通知父组件状态变化，这种设计有利于理解和调试应用状态

5. 函数组件与Hooks：最着React16.8引入了Hooks，函数组件获得了状态管理和声明周期功能，使得无需类就可以写出完整功能的组件，建议不简化代码结构，提高可读性和复用性

6. React Fiber：React 16 引入了调度算法改进，提供了更细力度的任务划分与优先级调度，增强了应用在复杂场景下的流畅度

7. 兼容性与扩展性：React生态丰富，支持服务端渲染(SSR)、静态站点生成(SSG)、移动应用开发(React Native)等多种应用场景，具备良好的兼容性与扩展能力




## 对React生命周期了解吗？
### 装载过程:
把组件第一次在DOM树上渲染的过程<br>
调用函数：
- construction
- getInitalState
- getDefaultProps
- componentWillMount
- render
- componentDidMount
#### constructor
ES6中每个类的构造函数，要创建一个组件类的实例，便会调用对应的构造函数

注意：
1. 并不是每个组件都需要定义自己的构造函数，无状态的React组件往往就不需要定义构造函数；
2. 一个React组件需要构造函数目的：
  - 初始化state，因为组件的生命周期中任何函数都可能要访问state，那么整个周期中第一个被调用的构造函数便是初始化state最理想的地方；
  - 绑定成员函数的this环境：
    - 因为在ES6语法下，类的每个成员函数在执行时的this并不是和类实例自动绑定的；
    - 而在构造函数中this就是当前组件实例，所以，为了方便将来调用，往往在构造函数中将这个实例的特定函数绑定this为当前类实例：
#### getInitialState和getDefaultProps
1. getInitialState函数的返回值用来初始化组件的this.state;
2. getInitialState只出现在装载过程，也就是说一个组件的整个生命周期过程中，这个函数只被调用一次；
3. getDefaultProps函数的返回值可以作为props的初始值；
4. 两个函数都只有在使用React.createClass方法创建组件类时才会用到：
5. React.createClass创建方法已经逐渐被Facebook官方废弃
6. 使用ES6时,在构造函数中通过this.state赋值完成状态初始化；通过给类属性（注意是类属性，而不是类的实例对象的属性）defaultProps赋值指定的props初始值：
#### render
- render函数是React组件中最重要的函数，一个React组件可以忽略其他所有函数都不实现，但一定要实现render函数，因为所有React组件的父类React.Component类对除了render之外的生命周期函数都有默认实现。
- 通常一个组件要发挥作用，总是要渲染一些东西，render函数并不做实际的渲染动作，它只是返回一个JSX描述结构，最终由React来操作渲染过程；
- 当某个特殊的组件作用不是渲染界面，或者没有东西可画时，可让render函数返回null或者false，即告诉React此组件不渲染任何DOM元素；
- 注意：render函数应该是一个纯函数，完全根据this.state和this.props来决定返回的结果，而且不要产生任何副作用，不要在render函数中调用this.setState去改变状态，因为一个纯函数不应该引起状态的改变。
#### componentWillMount和componentDidMount
- 在装载过程中，componentWillMount会在render函数之前调用，此时还没有任何东西渲染出来，即使调用this.setState修改状态也不会发生重新绘制；
- componentDidMount在render函数之后调用，但render调用之后并不会立即调用，而是在render函数返回的东西已经引发了渲染，组件已经被‘装载’到了DOM树上后，componentDidMount才被调用，此时已绘制出真实的DOM树；

注意：
1. render函数本身并不往DOM树上渲染或者装载内容，它只是返回一个表示JSX表示的对象（及组件实例），然后由React库根据返回的对象决定如何渲染；
2. 而React库肯定是要把所有组件返回的结果综合起来，才能知道如何产生对应的DOM修改；
3. 所以只有React库调用所有组件的render函数之后，才有可能完成DOM装载，这时候才会依调用componentDidMount函数作为装载的收尾。
4. componentWillMount可以在服务器和浏览器端被调用，而componentDidMount只能在浏览器端被调用（因为componentDidMount是在‘装载’完成之后被调用，且‘装载’是一个创建组件并放到DOM树上的过程，而服务器端渲染通过React组件产生的只是一个纯粹的字符串，并不会产生DOM树，即在服务器端不可能完成‘装载过程’所以无法调用componentDidMount）



### 更新过程
当组件被从新渲染的过程；<br>
调用函数：
- componentWillReceiveProps
- shouldComponentUpdate
  - componentWillUpdate
  - render
  - componentDidUpdate

- 随着用户的操作改变展示的内容，当props或者state被修改时，就会引发组件的更新过程；
- 更新过程会依次调用以下生命周期函数，其中render函数和“装载”过程一样：
  - componentWillReceiveProps
  - shouldComponentUpdate
    - componentWillUpdate
    - render
    - componentDidUpdate
- 并不是所有的更新过程都会执行全部函数。
#### componentWillReceiveProps（nextProps）
- 并不是只有在组件的props发生改变的时候才会调用此函数；
- 在更新过程，只要是父组件的render函数被调用，在render函数里被渲染的子组件就会经历更新过程，不管父组件传给子组件的props有没有改变，都会触发子组件的componentWillReceiveProps函数；
- 注意：通过this.setState方法触发的更新过程不会调用这个函数；
- 因为，这个函数适合根据新的props值（也就是参数nextProps）来计算是不是要更新内部状态state；而更新内部状态的方法是this.setState,如果this.setState的调用导致componentWillReceiveProps再调用，那将是一个死循环。
#### shouldComponentUpdate(nextProps,nextState)
- 除了render函数，shouleComponentUpdate可能是生命周期函数中最重要的一个函数；
- 因为render函数决定了该渲染什么，shouldComponentUpdate决定了一个组件什么时候不需要渲染；
- render和shouldComponentUpdate也是React生命周期函数中唯二两个要求有返回结果的函数；
- render函数的返回结果用于构建DOM对象，shouldComponentUpdate函数返回一个布尔值，告诉React库这个组件这次更新过程是否继续；
- 在更新过程中，React库首先调用shouldComponentUpdate函数，如果这个函数返回true，那就继续更新过程，接下来调用render，反之则终止此次更新过程；
- shouldComponentUpdate的参数就是接下来的props和state值；我们可以根据这两个参数，外加this.props和this.state来判断返回true或false，从而避免不必要的更新。
#### componentWillUpdate和componentDidUpdate
- 如果组件的shouldComponentUpdate返回true，React接下来调用componentWillUpdate、render和componentDidUpdate；
- 和“装载”过程不同，这对函数都可以在服务器和浏览器更新阶段调用
- 不过，通常在使用React做服务端渲染时，基本不会经历更新过程，因为服务器端只需要产出HTML字符串，而一个装载过程就足够产出HTML字符串了，所以正常情况下，服务器端不会调用componentDidUpdate函数，如果调用了，说明程序有错，需要改进。
### 卸载过程
组件从DOM树中删除的过程；<br>
调用函数：componentWillUnmount

- React组件的卸载过程只涉及一个函数componentWillUnmount,
- 当React组件要从DOM树上删除之前，对应的componentWillUnmount函数会被调用，所以这个函数适合做一些清理性的工作。






