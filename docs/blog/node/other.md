---
publish: false
title: 其他
createTime: 2021/03/04 23:21:20
permalink: /blog/il6rt7o0/
---
## 如何判断当前脚本运行在浏览器还是node环境中？（阿里）
```js
this === window ? 'browser' : 'node';
```