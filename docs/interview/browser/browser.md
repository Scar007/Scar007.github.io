---
publish: false
title: 浏览器
---
## 介绍一下你对浏览器内核的理解，常见的浏览器内核有哪些？
- 主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎
- 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核
- JS引擎则：解析和执行javascript来实现网页的动态效果
- 最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎

常见浏览器内核：
- IE: trident内核
- Firefox：gecko内核
- Safari:webkit内核
- Opera:以前是presto内核，Opera现已改用Google - Chrome的Blink内核
- Chrome:Blink(基于webkit，Google与Opera Software共同开发)



## 浏览器的架构组织(浏览器的组成部分)
架构：
- 用户界面
- 主进程
- 内核
  - 渲染引擎
  - JS引擎
    -执行栈
  - 事件触发线程
    - 消息队列
      - 微任务
      - 宏任务
  - 网络异步线程
  - 定时器线程

1. <strong>用户界面</strong>- 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
2. <strong>浏览器引擎</strong>- 在用户界面和呈现引擎之间传送指令。
3. <strong>呈现引擎</strong>- 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
4. <strong>网络</strong>- 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
5. <strong>用户界面后端</strong>- 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
6. <strong>JavaScript解释器</strong>-用于解析和执行 JavaScript 代码。
7. <strong>数据存储</strong>-这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

浏览器主要组件图：
![avatar](https://static.scar.vip/image/browser.png)
值得注意的是，和大多数浏览器不同，Chrome 浏览器的每个标签页都分别对应一个呈现引擎实例。每个标签页都是一个独立的进程。







## 你能描述一下渐进增强和优雅降级之间的不同吗?
- 渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带





## 什么是渐进增强?
渐进增强是指在 web 设计时强调可访问性、语义化 HTML 标签、外部样式表和脚本。保证所有人都能访问页面的基本内容和功能同时为高级浏览器和高带宽用户提供更好的用户体验。核心原则如下:
- 所有浏览器都必须能访问基本内容
- 所有浏览器都必须能使用基本功能
- 所有内容都包含在语义化标签中
- 通过外部 CSS 提供增强的布局
- 通过非侵入式、外部 javascript 提供增强功能
- end-user web browser preferences are respected






## 浏览器是如何渲染UI的？
1. 浏览器获取HTML文件，然后对文件进行解析，形成DOM Tree
2. 与此同时，进行CSS解析，生成Style Rules
3. 接着将DOM Tree与Style Rules合成为 Render Tree
4. 接着进入布局（Layout）阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标
5. 随后调用GPU进行绘制（Paint），遍历Render Tree的节点，并将元素呈现出来
![avatar](https://static.scar.vip/image/browser-UI.png)





## 浏览器如何解析css选择器？
浏览器会<strong>从右往左</strong>解析CSS选择器。<br>
我们知道DOM Tree与Style Rules合成为 Render Tree，实际上是需要将Style Rules附着到DOM Tree上，因此需要根据选择器提供的信息对DOM Tree进行遍历，才能将样式附着到对应的DOM元素上。<br>
简画DOM Tree：
![avatar](https://static.scar.vip/image/domtree.png)





## DOM Tree是如何构建的？
1. 转码: 浏览器将接收到的二进制数据按照指定编码格式转化为HTML字符串
2. 生成Tokens: 之后开始parser，浏览器会将HTML字符串解析成Tokens
3. 构建Nodes: 对Node添加特定的属性，通过指针确定 Node 的父、子、兄弟关系和所属 treeScope
4. 生成DOM Tree: 通过node包含的指针确定的关系构建出DOM Tree






## 浏览器渲染过程及优化建议
1. 解析：
一个是HTML/SVG/XHTML，事实上，Webkit有三个C++的类对应这三类文档。解析这三种文件会产生一个DOM Tree。 CSS，解析CSS会产生CSS规则树。 Javascript，脚本，主要是通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree.
2. 渲染：浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。注意：
Rendering Tree 渲染树并不等同于DOM树，因为一些像Header或display:none的东西就没必要放在渲染树中了。 CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element。也就是DOM结点。也就是所谓的Frame。 然后，计算每个Frame（也就是每个Element）的位置，这又叫layout和reflow过程。
3. 绘制：最后通过调用操作系统Native GUI的API绘制。

减少reflow和repaint
1. 不要一条一条地修改DOM的样式。还不如预先定义好css的class，然后修改DOM的className。
2. 把DOM离线后修改。如：
使用documentFragment 对象在内存里操作DOM 先把DOM给display:none(有一次reflow)，然后你想怎么改就怎么改。比如修改100次，然后再把他显示出来。 clone一个DOM结点到内存里，然后想怎么改就怎么改，改完后，和在线的那个的交换一下。
3. 不要把DOM结点的属性值放在一个循环里当成循环里的变量。不然这会导致大量地读写这个结点的属性
4. 为动画的HTML元件使用fixed或absoulte的position，尽量使用transfoem，那么修改他们的CSS是不会reflow的
5. 尽量少使用table布局。因为可能很小的一个小改动会造成整个table的重新布局






## 经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？
- png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.
- 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。
- IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。
浮动ie产生的双倍距离 #box{ float:left; width:10px; margin:0 0 0 100px;}
这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)
渐进识别的方式，从总体中逐渐排除局部。
首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。
接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```css
css
.bb{
background-color:red;/所有识别/
background-color:#00deff\9; /IE6、7、8识别/
+background-color:#a200ff;/IE6、7识别/
_background-color:#1e0bd1;/IE6识别/
}
```
- IE下,可以使用获取常规属性的方法来获取自定义属性,
也可以使用getAttribute()获取自定义属性;
Firefox下,只能使用getAttribute()获取自定义属性。

解决方法:统一通过getAttribute()获取自定义属性。
- IE下,even对象有x,y属性,但是没有pageX,pageY属性;
Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。

解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,
可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序: L-V-H-A : a:link {} a:visited {} a:hover {} a:active {}





## 把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？
之前推荐的方法（已过时）：之前解决这个问题的方法是把script标签放到body标签之后 ，这确保了解析到`</body>`之前都不会被script终端。这个方法是有问题的: 浏览器在整个文档解析完成之前都不能下载script文件，如果文档很大的话，解析完HTML，用户依然要等待script文件下载并执行完成之后，才能操作这个网站。

现在推荐的解决方案：
现在浏览器script标签支持 async 和 defer 属性. 应用这些属性当script被下载时，浏览器更安全而且可以并行下载（下载script并不阻断HTML解析）。
1. async标记的Script异步执行下载，并执行。这意味着script下载时并不阻塞HTML的解析，并且下载结束script马上执行。
2. defer标签的script顺序执行。这种方式也不会阻断浏览器解析HTML。
跟 async不同, defer scripts在整个文档里的script都被下载完才顺序执行。





## 检测浏览器版本版本有哪些方式？
1. userAgent特征检测<br>
比如：navigator.userAgent
```js
//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36
  (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"
```

2. window对象检测<br>
比如：'ActiveXObject' in window





## 浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别?
- 特性检查更适合针对实现了特定特性的浏览器进行操作。
- UA字符串由于被浏览器厂商可以随意修改，因此给使用者的感觉不太靠谱。






## DNS有没有缓存，获取缓存的流程是什么
[实践这一次，彻底搞懂浏览器缓存机制](https://segmentfault.com/a/1190000017962411)
[浅析 DNS 缓存技术及应用考虑](https://www.infoq.cn/article/8qmbxvabn3ec8vt5itxw)
[dns缓存](https://www.cnblogs.com/ityouknow/p/6380603.html)