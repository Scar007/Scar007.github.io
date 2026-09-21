---
publish: false
title: websocket
createTime: 2021/03/09 17:12:40
permalink: /blog/5tp9nhfx/
---
## Websocket协议
Websocket是一个持久化协议，基于http，服务端可以主动push。

兼容：
  - Flash Socket
  - 长轮询：定时发送ajax
  - long pall：发送——>有消息时再response

new WebSocket(url)

ws.onerror = fn

ws.onclose = fn

ws.onopen = fn

ws.onmessage = fn

ws.send()






## webSocket与传统的http有什么优势
- 客户端与服务器只需要一个TCP连接，比http长轮询使用更少的连接
- webSocket服务端可以推送数据到客户端
- 更轻量的协议头，减少数据传输量






## webSocket协议升级是什么，能简述一下吗？
首先，WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求，格式如下：
```js
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```
该请求和普通的HTTP请求有几点不同：
- GET请求的地址不是类似/path/，而是以ws://开头的地址；
- 请求头Upgrade: websocket和Connection: Upgrade表示这个连接将要被转换为WebSocket连接；
- Sec-WebSocket-Key是用于标识这个连接，并非用于加密数据；
- Sec-WebSocket-Version指定了WebSocket的协议版本。

随后，服务器如果接受该请求，就会返回如下响应：
```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```
该响应代码101表示本次连接的HTTP协议即将被更改，更改后的协议就是Upgrade: websocket指定的WebSocket协议。