---
title: 安全攻防
---
## 什么是XSS（Cross Site Scripting）攻击？
XSS也叫跨站脚本攻击

- 劫持HTML文件，通过 `<script>` 标签进行注入（参考 XSS game-Level2）；
- 在可执行的JS中，通过拼接数据来执行恶意脚本（参考 XSS game-Level3）；
- 在页面可执行的元素中，添加可执行代码，例如 javascript:xxx（参考 XSS game-Level5）；
- 在onload、onerror、onclick等事件中，注入不受控的代码。

分为三种
1. 存储型: 恶意的脚本存储到后端的数据库，然后又传输回到每一个用户的页面，从而发生了攻击。
2. 反射型: 这一次恶意脚本不是存储在数据库了，而是出现在URL里。
3. DOM型: DOM型的XSS攻击与服务器没有太大的关系，不需要和服务器交互，直接通过HTTP劫持，修改对应的HTML文件来实现恶意代码的注入。


为了不让恶意代码在网页中执行，谨记不能将不可信的数据当作代码来执行。
在DOM API中建议使用 .textContent/.setAttribute() 来替代 .innerHTML/.outerHTML/document.write()。在Vue项目中不建议使用v-html。

注入恶意代码
- cookie设置HTTPOnly
- 转义页面上的输入内容和输出内容

预防措施：
- 对输入，输出的结果进行必要的转义；
- 尽量使用post，对get使用时尽量对路径长度做限制；
- 使用httponly来方式黑客通过脚本获取用户cookie数据。
- 于客户本身，养成良好习惯，提高警惕，不随意点来陌生链接；


防御：
1. 转义
在存储型XSS和反射型XSS攻击中，这个是一个关键的防范方式，通过对不同类型的文本和数据做对应的转义和很好的防止大部分的XSS攻击。

2. CSP
CSP是Content Security Policy，在实际应用中，我们是通过在HTTP头部添加Content-Security-Policy的字段来实现的。

`Content-Security-Policy: default-src 'self' *.trusted.com`

在较为严格的CSP条件下，对XSS攻击的防范有以下的作用：

- 禁止加载外域代码，防止复杂的攻击逻辑；
- 禁止外域提交，网站被攻击后，用户数据不会泄漏；
- 禁止内联脚本执行；
- 禁止未授权的脚本执行；
- 通过CSP的上报功能，便于修复问题。

3. HttpOnly
HttpOnly 是 Cookie 的一个属性，在设置Cookie的时候可以对Cookie设置该属性，该属性主要是防止Cookie被JS脚本获取，只能通过Http传输和访问。

我们需要明确的是HttpOnly本质上并不是防止XSS攻击的，主要是起到缓解的作用，在恶意脚本执行之后，是无法获取到对应的Cookie，防止来下一步攻击的进行和用户数据的进一步泄漏。

[web安全之XSS攻击原理及防范](https://www.cnblogs.com/tugenhua0707/p/10909284.html)
[美团：前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
[解决v-html指令潜在的xss攻击](https://blog.csdn.net/lingxiaoxi_ling/article/details/105851736)


## xss攻击原理
第一、XSS反射型攻击，恶意代码并没有保存在目标网站，通过引诱用户点击一个链接到目标网站的恶意链接来实施攻击的。

第二、XSS存储型攻击，恶意代码被保存到目标网站的服务器中，这种攻击具有较强的稳定性和持久性。

解决方案:
1. url过滤
2. 提交的符号如<>（尖括号）、”（引号）、 ‘（单引号）、%（百分比符号）、;
    （分号）、()（括号）、&（& 符号）、+（加号）等转义。严格控制输出






## 什么是CSRF（cross-site request forgery）？
跨站请求伪造，利用的是网站对用户浏览器的信任，来制造攻击，黑客伪装成用户身份来执行一些非用户自愿的恶意以及非法操作（注意，这里是黑客伪装成用户操作）。

1. 用户通过登录账号等方式，访问网站A，网站A验证用户成功以后，会返回用户相关的一些信息以及鉴权信息，返回以后，一般会保存在cookie中。
2. 在没有退出的情况下，在此网站访问另一个网站，此时这个请求会携带用户的一些cookie信息，同时攻击者会拿到这些cookie。
3. 攻击者根据拿到的这些cookie信息，去访问网站A，网站A经过验证以后，确定cookie信息有效。至此达到伪造用户请求的目的，来盗取用户的信息和数据。


跨站请求伪造<br>
防护：
- get不修改数据
- 不被第三方网站访问到用户的cookie
- 设置白名单，不被第三方网站请求
- 请求校验


CSRF 跨站请求伪造.CSRF指的是攻击者盗用了你的身份,以你的名义发送恶意的请求,给你造成个人隐私泄露及财产安全.通常指携带你的ck进行请求一些链接。

解决方案：添加refer 改用token


防御：
1. 从浏览器中说起，从chrome51开始，set-cookie中增加了samesite属性，用来防止CSRF攻击和用户追踪，这个属性由三个值
  - strict: 最为严格。跨站访问时，不允许携带任何cookie，只有请求的目标地址与当前origin一直才行。
  - Lax: 稍微宽松些。跨站访问时，允许一部分请求携带cookie，包括a链接跳转，get表单提交。
  - none: 完全不防备。跨站访问时，允许所有请求方式携带cookie。设置none时，必须同时设置secure才能生效。

2. 从chrome76开始，请求头中增加了Sec-Fetch-*字段，**请求发起者的原点和目标资源的原点之间的关系**强化了CSRF防御能力。一般用于设置XHR接口请求，图片以及js，css，html没有设置。
   - Sec-Fetch-Mode: cors, no-cors, same-origin, navigate, websocket
   - Sec-Fetch-Site: same-site, same-origin, cross-site, none
   - ......

  Sec-Fetch-Site: same-site相对复杂些，不过以我个人的理解是：
  - 发起者和目标源协议必须都是https
  - 发起者域名必须是目标源域名的根域名，或者高一级域名，反之不行。

3. CSP(内容安全策略)
  - 通过在请求头或者html meta标签中增加Content-Security-*\
  ```js
    // request header
    "Content-Security-Policy:" 策略
    "Content-Security-Policy-Report-Only:" 策略
    // html
    <meta http-equiv="content-security-policy" content="策略">
    <meta http-equiv="content-security-policy-report-only" content="策略">
  ```
4. 向用户发送验证码，体验不好，只要涉及到私密信息都要发验证码的话，那移动和联通得挣多少钱，而且企业也不可能这么做，并且一直接受验证码，贼麻烦。
5. 服务端验证Request Header中的Referer字段，查看是否来自请求源白名单中的源地址。
6. Token或者Authorization字段验证，目前我司就是用这种方式。





## xss和csrf的区别
CSRF需要登陆后操作，XSS不需要；

CSRF是请求页面api来实现非法操作，XSS是向当前页面植入js脚本来修改页面内容。





## 网页验证码是干嘛的，是为了解决什么安全问题？
区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水； 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。





## 中间人攻击
[HTTPS中间人攻击实践（原理·实践）](https://www.cnblogs.com/lulianqi/p/10558719.html)
[什么是中间人攻击？](https://zhuanlan.zhihu.com/p/62025258)
[你连 HTTPS 原理都不懂,还讲“中间人攻击”?](https://juejin.cn/post/6844904065227292685)