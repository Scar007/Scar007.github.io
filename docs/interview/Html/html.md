---
publish: false
title: HTML
---

## XHTML 和 HTML 有什么区别？
- 一个是功能上的差别
  - 主要是XHTML可兼容各大浏览器、手机以及PDA，并且浏览器也能快速正确地编译网页

- 另外是书写习惯的差别
  - XHTML 元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素





## HTML全局属性(global attribute)有哪些？
- accesskey:设置快捷键，提供快速访问元素如aaa在 windows 下的 firefox 中按alt + shift + a可激活元素
- class:为元素设置类标识，多个类名用空格分开，CSS 和 javascript 可通过 class 属性获取元素
- contenteditable: 指定元素内容是否可编辑
- contextmenu: 自定义鼠标右键弹出菜单内容
- data-*: 为元素增加自定义属性
- dir: 设置元素文本方向
- draggable: 设置元素是否可拖拽
- dropzone: 设置元素拖放类型： copy, move, link
- hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
- id: 元素 id，文档内唯一
- lang: 元素内容的的语言
- spellcheck: 是否启动拼写和语法检查
- style: 行内 css 样式
- tabindex: 设置元素可以获得焦点，通过 tab 可以导航
- title: 元素相关的建议信息
- translate: 元素和子孙节点内容是否需要本地化



## html5有哪些新特性、移除了那些元素？
- HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加
  - 绘画 canvas
  - 用于媒介回放的 video 和 audio 元素
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
  - sessionStorage 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如 article、footer、header、nav、section
  - 表单控件，calendar、date、time、email、url、search
  - 新的技术webworker, websocket, Geolocation

- 移除的元素：
  - 纯表现的元素：basefont，big，center，font, s，strike，tt，u`
  - 对可用性产生负面影响的元素：frame，frameset，noframes

- 支持HTML5新标签：
  - IE8/IE7/IE6支持通过document.createElement方法产生的标签
  - 可以利用这一特性让这些浏览器支持HTML5新标签
  - 浏览器支持新标签后，还需要添加标签默认的样式

- 当然也可以直接使用成熟的框架、比如html5shim


## HTML5 为什么只需要写
- HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为
- 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型






