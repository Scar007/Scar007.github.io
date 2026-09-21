---
publish: false
title: SSR
createTime: 2021/02/06 23:57:59
permalink: /blog/yiemhe6l/
---
## 说说你对SSR的了解
- SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端
- SSR的优势
    - 更好的SEO
    - 首屏加载速度更快
- SSR的缺点
    - 开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子
    - 当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境
    - 更多的服务端负载