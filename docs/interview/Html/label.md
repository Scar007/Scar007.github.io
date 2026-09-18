---
publish: false
title: 元素标签
---
## 什么是 web 语义化,有什么好处?
web 语义化是指通过 HTML 标记表示页面包含的信息，包含了 HTML 标签的语义化和 css 命名的语义化。

HTML 标签的语义化是指：通过使用包含语义的标签（如 h1-h6）恰当地表示文档结构

css 命名的语义化是指：为 html 标签添加有意义的 class，id 补充未表达的语义，如Microformat通过添加符合规则的 class 描述信息




## 为什么需要语义化?
- 用正确的标签做正确的事情！
- 去掉或者丢失样式的时候能够让页面呈现清晰的结构，也便于对浏览器、搜索引擎解析；
- 有利于SEO，可以和搜索引擎建立良好的沟通，有助于爬虫抓取更多的有效信息（爬虫依赖于标签来确定上下文和各个关键字的权重）；
- 方便其他设备解析（如屏幕阅读器，盲人阅读器，移动设备等），以意义的方式来渲染网页；
- 便于团队的开发和维护，语义化更具有可读性，遵循W3C标准的团队都遵循这个标准，可以减少代码差异化，使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解；
## 行内元素、块级元素、空(void)各什么特点，元素分别有那些？

- 行内元素：不可以设置宽高，不独占一行 <br>
包含有：a、 b、 span、 img、 input、 select、 strong

- 块级元素：可以设置宽高，独占一行 <br>
包含有：div、 ul、 ol、 li、 dl、 dt、 dd、 h1~h6、p、

- 空元素：br、 hr、img、input、 link、meta




## strong与em的异同？
- strong:粗体强调标签，强调，表示内容的重要性
- em:斜体强调标签，更强烈强调，表示内容的强调点


## src与href的区别？
- src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。
- src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。
> \<script src ="js.js">`</script>` 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部
- href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加\<link href="common.css" rel="stylesheet"/>那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式





## script的引入方式？
- html静态\<script>引入
- js动态插入\<script>




## script标签里 defer和async的区别？
- \<script defer>：延迟加载(异步)，等待之前全部渲染完再去进行执行
- \<script async>：异步加载(异步)，加载完js后立马执行，执行时会阻塞元素渲染





## script 的位置是否会影响首屏显示时间？
在解析 HTML 生成 DOM 过程中，js 文件的下载是并行的，不需要 DOM 处理到 script 节点。因此，script的位置不影响首屏显示的开始时间。

浏览器解析 HTML 是自上而下的线性过程，script作为 HTML 的一部分同样遵循这个原则

因此，script 会延迟 DomContentLoad，只显示其上部分首屏内容，从而影响首屏显示的完成时间







## 把\<script>放在\</body>之前和之后有什么区别？浏览器会如何解析它们？
按照HTML标准，在\</body>结束后出现\<script>或任何元素的开始标签，都是解析错误
虽然不符合HTML标准，但浏览器会自动容错，使实际效果与写在\</body>之前没有区别
浏览器的容错机制会忽略\<script>之前的\</body>，视作\<script>仍在 body 体内。省略\</body>和\</html>闭合标签符合HTML标准，服务器可以利用这一标准尽可能少输出内容




## link与@import的区别
- link是 HTML 方式， @import是 CSS 方式
- link 功能较多，可以定义RSS，定义Rel等作用，而@import只能用于加载css
- 页面加载时，link会同步被加载，而@import所引用的css会等页面加载完才被加载
- link可以使用js动态引入，@import不行
- @import是CSS2.1 提出的，需要IE5以上才能使用，而link是XHTML标签，无兼容问题
- link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
- link可以通过rel="alternate stylesheet"指定候选样式
- 浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
- @import必须在样式规则之前，可以在 css 文件中引用其他文件

总体来说：link 优于@import






## button注意事项
```css
html,body{

overflow: hidden;/*手机上写overflow-x:hidden;会有兼容性问题，如果子级如果是绝对定位有运动到屏幕外的话ios7系统会出现留白*/

-webkit-overflow-scrolling:touch;/*流畅滚动,ios7下会有滑一下滑不动的情况，所以需要写上*/

position:realtive;/*直接子级如果是绝对定位有运动到屏幕外的话，会出现留白*/
}
```






## style标签写在body后与body前有什么区别？
一般情况下，页面加载时自上而下的。将style标签至于body之前，为的是先加载样式。

若是写在body标签之后，由于浏览器以逐行方式对html文档进行解析，当解析到写在写在文档尾部的样式表时，会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后会重新渲染，在windows的IE下可能会出现FOUC现象（页面闪烁）。





