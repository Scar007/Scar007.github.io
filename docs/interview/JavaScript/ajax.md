---
title: AJAX
---
## XMLHttpRequest 通用属性和方法
1. readyState:表示请求状态的整数，取值：
- UNSENT（0）：对象已创建
- OPENED（1）：open()成功调用，在这个状态下，可以为 xhr 设置请求头，或者使用 send()发送请求
- HEADERS_RECEIVED(2)：所有重定向已经自动完成访问，并且最终响应的 HTTP 头已经收到
- LOADING(3)：响应体正在接收
- DONE(4)：数据传输完成或者传输产生错误
2. onreadystatechange：readyState 改变时调用的函数
3. status：服务器返回的 HTTP 状态码（如，200， 404）
4. statusText:服务器返回的 HTTP 状态信息（如，OK，No Content）
5. responseText:作为字符串形式的来自服务器的完整响应
6. responseXML: Document 对象，表示服务器的响应解析成的 XML 文档
7. abort():取消异步 HTTP 请求
8. getAllResponseHeaders(): 返回一个字符串，包含响应中服务器发送的全部 HTTP 报头。每个报头都是一个用冒号分隔开的名/值对，并且使用一个回车/换行来分隔报头行
9. getResponseHeader(headerName):返回 headName 对应的报头值
10. open(method, url, asynchronous [, user, password]):初始化准备发送到服务器上的请求。method 是 HTTP 方法，不区分大小写；url 是请求发送的相对或绝对 URL；asynchronous 表示请求是否异步；user 和 password 提供身份验证
11. setRequestHeader(name, value):设置 HTTP 报头
12. send(body):对服务器请求进行初始化。参数 body 包含请求的主体部分，对于 POST 请求为键值对字符串；对于 GET 请求，为 null





## ajax实现原理及方法使用
readyState属性有五个状态值。<br>
0：是uninitialized，未初始化。已经创建了XMLHttpRequest对象但是未初始化。<br>
1：是loading.已经开始准备好要发送了。<br>
2：已经发送，但是还没有收到响应。<br>
3：正在接受响应，但是还不完整。<br>
4：接受响应完毕。<br>
responseText：服务器返回的响应文本。只有当readyState>=3的时候才有值，根据readyState的状态值，可以知道，当readyState=3，返回的响应文本不完整，只有readyState=4，完全返回，才能接受全部的响应文本。

responseXML：response  as Dom Document object。响应信息是xml，可以解析为Dom对象。
status：服务器的Http状态码，若是200，则表示OK，404，表示为未找到。
statusText：服务器http状态码的文本。比如OK，Not Found。




## 描述AJAX的工作原理
- 第一步： 创建AJAX对象(XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp));
- 第二步： 使用open打开连接，格式为open（请求方式，'请求路径'，同步/异步）；
- 第三步： 发送send();
- 第四步：当ajax对象完成第四步（onreadystatechange），数据接收完成。再判断对象状态码(readystate) 当状态码为成功接收的状态码时，HTTP响应完全接收 。 再判断http响应状态（200-300之间或者304），（缓存）执行回调函数 获取的数据转成字符串格式(responseText) 。

缺点：
- 对搜索引擎不友好；
- 跨域问题的限制；
- 要实现ajax下的前后退功能成本比较大；





## Flash和ajax各自的优缺点，以及在使用中如何取舍
- 于Flash来说： flash是个处理多媒体，矢量图形以及访问机器等；但是对于CSS，文本处理有不足，不容易被搜索；
- 于Ajax来说： Ajax对CSS，文本处理有很好的支持，亦支持搜索；但是对多媒体，矢量图形以及访问机器等不足；

共同点：
- 与服务器的无刷新传递消息；
- 可以检测用户的离线和在线状态；
- 可以操作DOM；







## 如何中断ajax请求？
设置超时时间让ajax自动断开；

手动停止ajax请求，其核心是调用XML对象的abort方法，ajax.abort()






## get和post的区别?
#### 传参：
get传参方式是通过地址栏URL传递，是可以直接看到get传递的参数，get把请求的数据在URL后通过?连接，通过&进行参数分割

post传参方式参数URL不可见， post将参数存放在HTTP的包体内
#### 大小限制：
get通过URL进行传递，对传递的数据长度是受到URL大小的限制，URL最大长度是2048个字符

post没有长度限制;
#### 回退影响：
get回退不会有影响

post回退会重新进行提交
#### 缓存：
get请求可以被缓存

post不可以被缓存
#### 编码：
get请求只URL编码

post支持多种编码方式
#### 提交字符类型限制：
get只支持ASCII字符

post提交没有字符类型限制
#### 历史记录：
get请求的记录会留在历史记录中

post请求不会留在历史记录



