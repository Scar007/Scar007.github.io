---
publish: false
title: hack
---
## css hack 概念原理以及简述几个css hack?
CSS hack是通过在CSS样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，CSS hack就是让你记住这个标准），以达到应用不同的CSS样式的目的。

常见的 hack 有：
- 属性 hack：不同浏览器解析 bug 或方法
```css
/* IE6 */
#once { _color: blue }

/* IE6, IE7 */
#doce { *color: blue; /* or #color: blue */ }

/* Everything but IE6 */
#diecisiete { color/**/: blue }

/* IE6, IE7, IE8 */
#diecinueve { color: blue\9; }

/* IE7, IE8 */
#veinte { color/*\**/: blue\9; }

/* IE6, IE7 -- acts as an !important */
#veintesiete { color: blue !ie; } /* string after ! can be anything */
```
- 选择器 hack：不同浏览器对选择器的支持不一样
```css
/***** Selector Hacks ******/

/* IE6 and below */
* html #uno {
  color: red;
}

/* IE7 */
*:first-child + html #dos {
  color: red;
}

/* IE7, FF, Saf, Opera  */
html > body #tres {
  color: red;
}

/* IE8, FF, Saf, Opera (Everything but IE 6,7) */
html>/**/body #cuatro {
  color: red;
}

/* Opera 9.27 and below, safari 2 */
html:first-child #cinco {
  color: red;
}

/* Safari 2-3 */
html[xmlns*=''] body:last-child #seis {
  color: red;
}

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:nth-of-type(1) #siete {
  color: red;
}

/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:first-of-type #ocho {
  color: red;
}

/* saf3+, chrome1+ */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  #diez {
    color: red;
  }
}

/* iPhone / mobile webkit */
@media screen and (max-device-width: 480px) {
  #veintiseis {
    color: red;
  }
}

/* Safari 2 - 3.1 */
html[xmlns*='']:root #trece {
  color: red;
}

/* Safari 2 - 3.1, Opera 9.25 */
*|html[xmlns*=''] #catorce {
  color: red;
}

/* Everything but IE6-8 */
:root * > #quince {
  color: red;
}

/* IE7 */
* + html #dieciocho {
  color: red;
}

/* Firefox only. 1+ */
#veinticuatro,
x:-moz-any-link {
  color: red;
}

/* Firefox 3.0+ */
#veinticinco,
x:-moz-any-link,
x:default {
  color: red;
}
```
- IE 条件注释：适用于[IE5, IE9]，常见格式如下：
```js
<!--[if IE 6]>
Special instructions for IE 6 here
<![endif]-->
```

1.  图片间隙
在div中插入图片，图片会将div下方撑大3px：
- hack1： 将\<div>与\<img>写在同一行；
- hack2： 给\<img>添加display：block；

dt li 中的图片间隙：
- hack1: 给<img>添加display：block；

2. 默认高度，IE6以下版本中，部分块元素，拥有默认高度（低于18px）：
- hack1： 给元素添加： font-size： 0；
- hack2： 声明： overflow： hidden；

表单行高不一致：
- hack1： 给表单添加声明： float： left; height:  ; border: 0;

鼠标指针：
- hack： 若统一某一元素鼠标指针为手型：cursor： pointer;,当li内的a转化为块元素时，给a设置float，IE里面会出现阶梯状；
- hack1： 给a添加display： inline-block;
- hack2： 给li添加float: left;






## IE6 浏览器有哪些常见的 bug,缺陷或者与标准不一致的地方,如何解决

- IE6 不支持 min-height，解决办法使用 css hack：
```css
.target {
    min-height: 100px;
    height: auto !important;
    height: 100px;   // IE6下内容高度超过会自动扩展高度
}
```
- ol内li的序号全为 1，不递增。解决方法：为 li 设置样式display: list-item;
- 未定位父元素overflow: auto;，包含position: relative;子元素，子元素高于父元素时会溢出。解决办法：1）子元素去掉position: relative;; 2）不能为子元素去掉定位时，父元素position: relative;
```css
<style type="text/css">
.outer {
    width: 215px;
    height: 100px;
    border: 1px solid red;
    overflow: auto;
    position: relative;  /* 修复bug */
}
.inner {
    width: 100px;
    height: 200px;
    background-color: purple;
    position: relative;
}
</style>

<div class="outer">
    <div class="inner"></div>
</div>
```
- IE6 只支持a标签的:hover伪类，解决方法：使用 js 为元素监听 mouseenter，mouseleave 事件，添加类实现效果：
```css
<style type="text/css">
.p:hover,
.hover {
    background: purple;
}
</style>

<p class="p" id="target">aaaa bbbbb<span>DDDDDDDDDDDd</span> aaaa lkjlkjdf j</p>

<script type="text/javascript">
function addClass(elem, cls) {
    if (elem.className) {
        elem.className += ' ' + cls;
    } else {
        elem.className = cls;
    }
}
function removeClass(elem, cls) {
    var className = ' ' + elem.className + ' ';
    var reg = new RegExp(' +' + cls + ' +', 'g');
    elem.className = className.replace(reg, ' ').replace(/^ +| +$/, '');
}

var target = document.getElementById('target');
if (target.attachEvent) {
    target.attachEvent('onmouseenter', function () {
        addClass(target, 'hover');
    });
    target.attachEvent('onmouseleave', function () {
        removeClass(target, 'hover');
    })
}
</script>
```
- IE5-8 不支持opacity，解决办法：
```css
.opacity {
    opacity: 0.4
    filter: alpha(opacity=60); /* for IE5-7 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE 8*/
}
```
- IE6 在设置height小于font-size时高度值为font-size，解决办法：font-size: 0;
- IE6 不支持 PNG 透明背景，解决办法: IE6 下使用 gif 图片
- IE6-7 不支持display: inline-block解决办法：设置 inline 并触发 hasLayout
```css
display: inline-block;
*display: inline;
*zoom: 1;
```
- IE6 下浮动元素在浮动方向上与父元素边界接触元素的外边距会加倍。解决办法： 1）使用 padding 控制间距。 2）浮动元素display: inline;这样解决问题且无任何副作用：css 标准规定浮动元素 display:inline 会自动调整为 block
- 通过为块级元素设置宽度和左右 margin 为 auto 时，IE6 不能实现水平居中，解决方法：为父元素设置text-align: center;