---
publish: false
title: DOM
createTime: 2021/03/07 03:24:24
permalink: /blog/7qg7qzm6/
---
## 手写深度遍历节点
```js
function traverseDF(node,nodeList){
    if(node){
    nodeList.push(node);
        for(var i=0;i<node.children.length;i++){
            traverseDF(node.children[i],nodeList);
        }
    }
}
```





## 模拟实现虚拟DOM Diff