---
title: DOM
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