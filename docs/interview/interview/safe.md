## 安全
[安全攻防](https://interview.scar.vip/safe/safe.html)
- XSS，如何防范<br>
  [web安全之XSS攻击原理及防范](https://www.cnblogs.com/tugenhua0707/p/10909284.html)<br>
  [美团 前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)<br>
  [解决v-html指令潜在的xss攻击](https://blog.csdn.net/lingxiaoxi_ling/article/details/105851736)

  XSS(跨站攻击脚本)<br>
  原理：恶意攻击者在web页面插入一些恶意script代码。当用户浏览该页面时，嵌入的script就会执行，从而达到攻击目的。<br>
  `反射型`：一次性攻击，攻击者通过特定的方式来诱惑受害者访问恶意代码URL，当点击了URL之后，恶意代码慧姐在受害者的主机上的浏览器执行。恶意链接<br>
  `存储型`：将恶意代码上传到服务器，等用户请求的时候将恶意代码拼到html中返回，在用户浏览器上执行。后端可以做数据过滤，常见的有：用户私信、商品评论、论坛发帖等<br>
  `DOM型`：动态插入dom时，如document.write()、document.innerHTML()等。前端可以对html进行编辑处理防止攻击

  防范：
  1. html等内容进行转义
  2. URL传参进行编码处理
  3. 设置HTTP的CSP(content srcuity Policy)
  4. cookie设置HttpOnly、secure、samesite等
  5. 后端进行数据过滤

- CSRF，如何防范<br>
  [CSRF 攻击是什么？如何防范?](https://www.jianshu.com/p/b99dc31f1e9f)<br>
  [美团 前端安全系列（二）：如何防止CSRF攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

  CSRF(跨站请求伪造)
  攻击者诱导受害者进入第三方网站，并在第三方网站上登陆。拿到登录信息后，冒充受害者做一些操作。
  `GET型`
  `POST型`
  `链接类型`

  防范：
  1. 验证HTTP Referer字段，同源检测
  2. 使用验证码，但体验不好
  3. cookie、token双重验证，配合samesite cookie
  4. authorization验证，我司目前的使用

- 中间人攻击<br>
  [HTTPS中间人攻击实践（原理·实践）](https://www.cnblogs.com/lulianqi/p/10558719.html)
  
  中间人攻击一般发生在https请求上，因为https请求需要验证证书，中间人可以伪造证书，然后相当于中间代理一样，浏览器不是直接向服务器请求数据了，而是向中间人请求，中间人也是通过浏览器拿到一系列的信息，然后向服务器请求真实数据，拿到真实数据后再返给客户端。<br>
  
  浏览器对证书的验证若不容过的话只是给出警告，基于这一点，我们其实平常在调试pad等一些设备的时候，就可以利用这一点，我们可以给证书授权，然后通过中间代理插件charles等，获取到请求信息，拿到对应的数据，进行调试。
