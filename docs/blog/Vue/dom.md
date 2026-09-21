---
publish: false
title: 虚拟DOM
createTime: 2021/03/10 15:46:50
permalink: /blog/3iuigwv7/
---
## 说一下虚拟Dom以及key属性的作用
产生的原因：由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的产生原因。DOM出现的主要目的就是为了减少频繁操作DOM而引起回流重绘所引发的性能问题的！

介绍：Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点，该对象包含了真实DOM的结构及其属性，用于对比虚拟DOM和真实DOM的差异，从而进行局部渲染来达到优化性能的目的。是对真实DOM的一层抽象。(也就是源码中的VNode类，它定义在src/core/vdom/vnode.js中。)

虚拟DOM的优点：
1. 兼容性好。因为Vnode本质是JS对象，所以不管Node还是浏览器环境，都可以操作；
2. 减少了对Dom的操作。页面中的数据和状态变化，都通过Vnode对比，只需要在比对完之后更新DOM，不需要频繁操作，提高了页面性能；
3. 提高渲染性能。在大量、频繁的数据更新下，依托diff算法，能够对视图进行合理、高效的更新。

虚拟 DOM 的实现原理主要包括以下 3 部分：
  - 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
  - diff 算法 — 比较两棵虚拟 DOM 树的差异；
  - pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速
  - 更准确：因为带 key 就不是就地复用了，在 sameNode 函数a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。
  - 更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快






## 虚拟DOM和真实DOM的区别：
- 虚拟DOM不会进行回流和重绘；
- 真实DOM在频繁操作时引发的回流重绘导致性能很低；
- 虚拟DOM频繁修改，然后一次性对比差异并修改真实DOM，最后进行依次回流重绘，减少了真实DOM中多次回流重绘引起的性能损耗；
- 虚拟DOM有效降低大面积的重绘与排版，因为是和真实DOM对比，更新差异部分，所以只渲染局部；






## virtual dom实现原理
- 创建dom树
- 树的diff，同层对比，输出patchs(listDiff/diffChildren/diffProps)
  - 没有新的节点，返回
    - 新的节点tagName与key不变，对比props，继续递归遍历子树
      - 对比属性(对比新旧属性列表)：
        - 旧属性是否存在于新属性列表中
        - 都存在的是否有变化
        - 是否出现旧列表中没有的新属性
  - tagName 和key值变化了，则直接替换成新节点
- 渲染差异
  - 遍历patchs，把需要更改的节点取出来
  - 局部更新dom

[文章链接1](https://juejin.cn/post/6864108861290627080)
[文章链接2](https://juejin.cn/post/6844903923183157261)
[文章链接3](https://juejin.cn/post/6844903496232206349#heading-4)





## diff算法说一下
- 同级比较，再比较子节点

  patch函数是通过判断新老节点是否为同一节点：
  - 如果是同一节点，执行patchVnode进行子节点比较；
    - 新老节点一样，直接返回
    - 老节点有子节点，新节点没有：删除老节点的子节点
    - 老节点没有子节点，新节点有子节点：新节点的子节点直接append到老节点
    - 都只有文本节点：直接用新节点的文本节点替换老的文本节点；
    - 都有子节点：updateChildren
      - 提取出新老节点的子节点：新节点子节点ch和老节点子节点oldCh；
      - ch和oldCh分别设置StartIdx（指向头）和EndIdx（指向尾）变量，它们两两比较（按照sameNode方法），有四种方式来比较。如果4种方式都没有匹配成功，如果设置了key就通过key进行比较，在比较过程种startIdx++，endIdx--，一旦StartIdx > EndIdx表明ch或者oldCh至少有一个已经遍历完成，此时就会结束比较。
  - 如果不是同一节点，新节点直接替换老节点；
- 先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)
- 比较都有子节点的情况(核心diff)
- 递归比较子节点
> 需要再详细点

[文章链接1](https://juejin.cn/post/6844903607913938951)

diff算法的实现：
```js
function diff(oldTree, newTree) {
  // 差异收集
  let pathchs = {};
  dfs(oldTree, newTree, 0, pathchs);
  return pathchs;
}
function dfs(oldNode, newNode, index, pathchs) {
  let curPathchs = [];
  if (newNode) {
    // 当新旧节点的tagName 和 key 值完全一致时
    if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
      // 继续对比属性差异
      let props = diffProps(oldNode.props, newNode.props);
      curPathchs.push({ type: 'changeProps', props });
      // 递归进入下一层级的比较
      diffChildrens(oldNode.children, newNode.children, index, pathchs);
    } else {
      // 当 tagName 或者key 修改了后，表示已经是全新节点，无需对比
      curPathchs.push({ type: 'replaceNode', node: newNode });
    }
  }

  // 构建出整颗差异树
  if (curPathchs.length) {
    if (pathchs[index]) {
      pathchs[index] = pathchs[index].concat(curPathchs);
    } else {
      pathchs[index] = curPathchs;
    }
  }
}

// 属性对比实现
function diffProps(oldProps, newProps) {
  let propsPathchs = [];
  // 遍历新旧属性列表
  // 查找删除项
  // 查找修改项
  // 查找新增项
  forin(oldProps, (k, v) => {
    if (!newProps.hasOwnProperty(k)) {
      propsPathchs.push({ type: 'remove', prop: k });
    } else {
      if (v !== newProps[k]) {
        propsPathchs.push({ type: 'change', prop: k, value: newProps[k] });
      }
    }
  })
  forin(newProps, (k, v) => {
    if (!oldProps.hasOwnProperty(k)) {
      propsPathchs.push({ type: 'add', prop: k, value: v });
    }
  })

  return propsPathchs;
}

// 对比子级差异
function diffChildrens(oldChild, newChild, index, pathchs) {
  // 标记子集的删除、新增、移动
  let { change, list } = diffList(oldChild, newChild, index, pathchs);
  if (change.length) {
    if (pathchs[index]) {
      pathchs[index] = pathchs[index].concat(change);
    } else {
      pathchs[index] = change;
    }
  }

  // 根据key获取原本匹配的节点，进一步递归从头开始对比
  oldChild.map((item, i) => {
    let keyIndex = list.indexOf(item.key);
    if (keyIndex) {
      let node = newChild[keyIndex];
      // 进一步递归对比
      dfs(item, node, index, pathchs);
    }
  })
}

// 列表对比，主要也是根据key值查找匹配项
// 对比出新旧列表的新增、删除、移动
function diffList(oldList, newList, index, pathchs) {
  let change = [];
  let list = [];
  const newKeys = getKey(newList);
  oldList.map(v => {
    if (newKeys.indexOf(v.key) > -1) {
      list.push(v.key);
    } else {
      list.push(null);
    }
  })

  // 标记删除
  for(let i = list.length - 1; i >= 0; i--) {
    if (!list[i]) {
      list.splice(i, 1);
      change.push({ type:'remove', index: i });
    }
  }

  // 标记新增和移动
  newList.map((item, i) => {
    const key = item.key;
    const index = list.indexOf(key);
    if (index === -1 || key === null) {
      // 新增
      change.push({ type: 'add', node: item, index: i });
      list.splice(i, 0, key);
    } else {
      // 移动
      if(index !== i) {
        change.push({
          type: 'move',
          form: index,
          to: i,
        })
        move(list, index, i);
      }
    }
  })

  return { change, list }
}
```
