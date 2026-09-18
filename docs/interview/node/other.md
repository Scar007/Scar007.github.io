---
title: 其他
---
## 如何判断当前脚本运行在浏览器还是node环境中？（阿里）
```js
this === window ? 'browser' : 'node';
```