---
title: 通信
---
## 前端如何实现即时通讯？
### 短轮询
短轮询的原理很简单，每隔一段时间客户端就发出一个请求，去获取服务器最新的数据，一定程度上模拟实现了即时通讯。
- 优点：兼容性强，实现非常简单
- 缺点：延迟性高，非常消耗请求资源，影响性能
### comet
comet有两种主要实现手段，一种是基于 AJAX 的长轮询（long-polling）方式，另一种是基于 Iframe 及 htmlfile 的流（streaming）方式，通常被叫做长连接。<br>
[基于HTTP长连接的Web端实时通信技术](http://www.52im.net/thread-334-1-1.html)<br>
长轮询优缺点：<br>
- 优点：兼容性好，资源浪费较小
- 缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护
长连接优缺点：<br>
- 优点：兼容性好，消息即时到达，不发无用请求
- 缺点：服务器维护长连接消耗资源
### SSE
SSE（Server-Sent Event，服务端推送事件）是一种允许服务端向客户端推送新数据的HTML5技术。
- 优点：基于HTTP而生，因此不需要太多改造就能使用，使用方便，而websocket非常复杂，必须借助成熟的库或框架
- 缺点：基于文本传输效率没有websocket高，不是严格的双向通信，客户端向服务端发送请求无法复用之前的连接，需要重新发出独立的请求
### Websocket
Websocket是一个全新的、独立的协议，基于TCP协议，与http协议兼容、却不会融入http协议，仅仅作为html5的一部分，其作用就是在服务器和客户端之间建立实时的双向通信。
- 优点：真正意义上的实时双向通信，性能好，低延迟
- 缺点：独立与http的协议，因此需要额外的项目改造，使用复杂度高，必须引入成熟的库，无法兼容低版本浏览器

[阮一峰WebSocket教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
### Web Worker
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行

[阮一峰Web Worker教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
### Service workers
Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理，创建有效的离线体验。

[service Worker教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)






## 如何实现多个标签之间的通信?
<strong>调用 localStorage:</strong>
- 在一个标签内使用localStorage。setItem(key, value)添加（删除或修改）内容；
- 在另一个标签页面监听storage事件；
- 得到localStorage存储的值，即可实现不用页面之间的通信。

<strong>调用 cookie+setInterval():</strong>
- 将要传递的信息存储在cookie中，可以设置定时读取cookie的信息，即可随时获取想要传递的信息。

<strong>使用 Webworker:</strong>
- webworker作为浏览器的一个新特性，可以提供一个额外的线程来执行一些js代码，并且对浏览器用户界面不影响；
- 普通的Webworker用 new worker()即可创建，这种webworker是当前页面专有的。然后还有种共享worker(SharedWorker)，这种是可以多个标签页、iframe共同使用；


<strong>使用 SharedWorker:</strong>
- SharedWorker可以被多个window共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)；







## 跨标签页通讯
不同标签页间的通讯，本质原理就是去运用一些可以共享的中间介质，常用的有以下方式：
- 通过父页面window.open()和子页面postMessage
  - 异步下，通过window.open('about: blank')和tab.location.href = '*'
- 设置同域下共享的localStorage与监听window.onstorage
  - 重复写入相同的值无法触发
  - 会受到浏览器隐身模式等的限制
- 设置共享cookie与不断轮询脏检查(setInterval)
- 借助服务端或者中间层实现
