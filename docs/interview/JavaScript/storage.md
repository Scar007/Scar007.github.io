---
publish: false
title: 存储
---
## cookies，sessionStorage 和 localStorage 的异同？
都会在浏览器端保存，有大小限制，同源限制

#### 存储位置
- cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递，cookie 会在请求时发送到服务器，作为会话标识，服务器可修改。
- sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
#### 存储大小：
- 浏览器不能保存超过 300 个 cookie，单个服务器不能超过 20 个，每个 cookie 不能超过 4k。
- sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大
#### 访问限制/共享
- cookie 有 path 概念，子路径可以访问父路径 cookie，父路径不能访问子路径 cookie，cookie 在同源且符合 path 规则的文档之间共享
- localStorage可以读取并修改同源文档数据
- sessionStorage只允许同一个窗口下的文档访问
#### 有效期：
- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据，
- sessionStorage 数据在当前浏览器窗口关闭后自动删除，
- cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
#### 其他：
- localStorage 的修改会促发其他文档窗口的 update 事件
- cookie 有 secure 属性要求 HTTPS 传输
### 应用场景
因为考虑到每个 HTTP 请求都会带着 Cookie 的信息，所以 Cookie 当然是能精简就精简啦，比较常用的一个应用场景就是判断用户是否登录。针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录啦。曾经还使用 Cookie 来保存用户在电商网站的购物车信息，如今有了 localStorage，似乎在这个方面也可以给 Cookie 放个假了~

而另一方面 localStorage 接替了 Cookie 管理购物车的工作，同时也能胜任其他一些工作。比如HTML5游戏通常会产生一些本地数据，localStorage 也是非常适用的。如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。

需要注意的是，不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。






## cookie 和 session 的区别？
#### 存放位置不同
- cookie数据存放在客户的浏览器上
- session数据存放在服务器上
#### 安全性
cookie不是很安全，别人可以分析利用存放在本地的cookie进行欺骗，session会比cookie安全很多
#### 性能
session会在一定时间内保存在服务器上，当访问增多时，服务器的性能压力也随之增大，若考虑服务器性能压力问题，则可使用cookie

结合安全性和性能考虑，建议将登陆等重要信息存放为session，其他需要保留的信息可以存放在cookie中
#### 数据存储
单个cookie保存的数据不能超过4k，很多浏览器都限制一个站点最多保存20个cookie
#### 数据
- cookie保存的是字符串
- session保存的是对象
- session保存在服务器，客户端不知道其中的信息；
- cookie保存在客户端，服务器能够知道其中的信息；
#### 路径访问
session不能区分路径，同一个用户在访问一个网站期间，所有的session在任何地方都可以访问到，而cookie中如果设置了路径参数，那同一网站中不同路径下的cookie互相是访问不到的






## cookie 及其操作
- cookie 是 web 浏览器存储的少量数据，最早设计为服务器端使用，作为 HTTP 协议的扩展实现。cookie 数据会自动在浏览器和服务器之间传输。
- 通过读写 cookie 检测是否支持
- cookie 属性有name，value，max-age，path, domain，secure；
- cookie 默认有效期为浏览器会话，一旦用户关闭浏览器，数据就丢失，通过设置max-age=seconds属性告诉浏览器 cookie 有效期
- cookie 作用域通过文档源和文档路径来确定，通过path和domain进行配置，web 页面同目录或子目录文档都可访问
- 通过 cookie 保存数据的方法为：为 document.cookie 设置一个符合目标的字符串如下
- 读取 document.cookie 获得'; '分隔的字符串，key=value,解析得到结果
```js
document.cookie = 'name=qiu; max-age=9999; path=/; domain=domain; secure';

document.cookie = 'name=aaa; path=/; domain=domain; secure';
// 要改变cookie的值，需要使用相同的名字、路径和域，新的值
// 来设置cookie，同样的方法可以用来改变有效期

// 设置max-age为0可以删除指定cookie

//读取cookie，访问document.cookie返回键值对组成的字符串，
//不同键值对之间用'; '分隔。通过解析获得需要的值
```
[cookie工具](https://github.com/qiu-deqing/google/blob/master/module/js/cookieUtil.js)

cookie属性有：name, value, domain, path, expires/max-age, httponly, secure, same-site<br>
属性对应的含义：
- `name`: 某一个cookie对应的key。
- `value`: 某一个cookie对应的value。
- `domain`: 字段为可以访问此cookie的域名。如果带`.`,说明只要是以这个domain为根域的请求，都可以拿到cookie。如果不带`.`,说明只有这个域名能拿到对应的cookie。

非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成。

顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。

二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。
顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。
- `path`: 字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。
- `expires/max-age`: 对应的cookie过期时间。`expires`对应的是一个时间戳，而`max-age`是一个时间长度，单位是`s`。如果值是- `session`的话，则表示这一条cookie是一个session-cookie，会话结束就会被删除。
- `httponly`: 如果为`true`，则表示这条cookie只能http请求访问，js脚本无法读取。
- `same-site`: 设置特定根域的请求才能访问。 `https://juejin.cn/post/6877496781505200142`。
- `secure`: 如果为`true`，只能在https请求中传输。
- `size`: 此cookie大小



## Cookie在客户机上是如何存储的
cookies是服务器暂时放在我们电脑里的文本文件，好让服务器来辨认我们的计算机。

当我们在浏览网站的时候，web服务器会先发送小部分资料放在我们的计算机中，cookies会帮助我们，将我们在网站上打印的文字或一些选择记录下来，当我们再次访问同一个网站，web服务器会先检查有没有它上次留下的cookies资料。

若有，会依据cookies里面的内容来判断使用者，从而给我们推出相应的网页内容。





## 浏览器本地存储和服务器存储的区别
1. 数据既可以在浏览器本地存储，也可以在服务器存储
2. 浏览器可以保存一些数据，需要的时候可以直接从本地拿取，sessionStorage、localStorage 和 cookie 都是由浏览器存储在本地的数据
3. 服务器端也可以保存所有用户的所有数据，但需要的时候浏览器要向服务器请求数据
4. 服务器端可以保存用户的持久数据，如数据库和云存储将用户的大量数据保存在服务器端，服务器端也可以保存用户的临时会话数据，服务器端的session机制，如jsp的session对象，数据保存在服务器上
5. 服务器和浏览器之间仅需要传递session id即可，服务器根据session id找到对应用户session对象，会话数据仅在一段时间内有效，这个时间就是server端设置的session有效期
6. 服务器端保存所有的用户数据，所以服务器的开销较大，而浏览器端保存则把不同用户需要的数据分别保存在用户各自的浏览器中，浏览器端一般只用来存储小数据，而非服务可以存储大数据或小数据服务器存储数据安全一些，浏览器只适合存储一般数据。






## 应用程序存储和离线 web 应用
HTML5 新增应用程序缓存，允许 web 应用将应用程序自身保存到用户浏览器中，用户离线状态也能访问。
1. 为 html 元素设置 manifest 属性: \<html manifest="myapp.appcache">，其中后缀名只是一个约定，真正识别方式是通过text/cache-manifest作为 MIME 类型，所以需要配置服务器保证设置正确。
2. manifest 文件首行为CACHE MANIFEST，其余就是要缓存的 URL 列表，每个一行，相对路径都相对于 manifest 文件的 url，注释以#开头。
3. url 分为三种类型：
  - CACHE:为默认类型
  - NETWORK：表示资源从不缓存
  - FALLBACK:每行包含两个 url，第二个 URL 是指需要加载和存储在缓存中的资源， 第一个 URL 是一个前缀。任何匹配该前缀的 URL 都不会缓存，如果从网络中载入这样的 URL 失败的话，就会用第二个 URL 指定的缓存资源来替代。
以下是一个文件例子：
```js
CACHE MANIFEST

CACHE:
myapp.html
myapp.css
myapp.js

FALLBACK:
videos/ offline_help.html

NETWORK:
cgi/
```


