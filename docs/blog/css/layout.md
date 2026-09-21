---
publish: false
title: 布局
createTime: 2021/03/11 17:38:20
permalink: /blog/it2at0ir/
---
## 常用的几种布局方式
- <strong>固定布局</strong>：最外层盒子宽度固定且不能移动，里面的各个模块也是固定宽度而不是百分比。无论访问者的屏幕的分辨率是多少，网页都显示为和其他访问者相同的宽度。
- <strong>流式布局（自适应布局）</strong>：盒子宽高按百分比（故而也称之为百分比布局）。
- <strong>定位布局</strong>： 使用决定定位，相对定位和固定定位的布局
- <strong>浮动布局</strong>：使用float:left;和float:right;设置布局，注意清除浮动。
- <strong>响应式布局（媒体查询）</strong>： 使用@media
- <strong>弹性布局（伸缩布局）</strong>：献上阮一峰老师的细致分析文档：[flex布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

[CSS 常见布局方式](https://juejin.cn/post/6844903491891118087)





## 圣杯布局和双飞翼布局
[参考文章](https://www.jianshu.com/p/f9bcddb0e8b4)
[阮一峰 只要一行代码，实现五种 CSS 经典布局](https://www.ruanyifeng.com/blog/2020/08/five-css-layouts-in-one-line.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>圣杯布局</title>
  <style>
    .header {
      height: 100px;

      background-color: aqua;
    }
    .footer {
      height: 100px;

      background-color: aquamarine;
    }
    .container {
      padding: 0 300px 0 200px;
      overflow: hidden;
    }
    .middle {
      width: 100%;
      height: 100px;
      float: left;

      background-color: blue;
    }
    .left {
      width: 200px;
      height: 100px;
      float: left;
      margin-left: -100%;
      position: relative;
      left: -200px;

      background-color: blueviolet;
    }
    .right {
      width: 300px;
      height: 100px;
      float: left;
      margin-left: -300px;
      position: relative;
      right: -300px;

      background-color: brown;
    }
  </style>
</head>
<body>
  <div class="header">header</div>
  <div class="container">
    <div class="middle">middle</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
  <div class="footer">footer</div>
</body>
</html>
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>双飞翼布局</title>
  <style>
    .header {
      height: 100px;

      background-color: aqua;
    }
    .footer {
      height: 100px;
      clear: both;

      background-color: aquamarine;
    }
    .container {
      float: left;
      height: 100px;
      width: 100%;
    }
    .middle {
      height: 100px;
      margin: 0 300px 0 200px;

      background-color: blue;
    }
    .left {
      float: left;
      width: 200px;
      height: 100px;
      margin-left: -100%;

      background-color: blueviolet;
    }
    .right {
      float: left;
      width: 300px;
      height: 100px;
      margin-left: -300px;

      background-color: brown;
    }
  </style>
</head>
<body>
  <div class="header">header</div>
  <div class="container">
    <div class="middle">middle</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
  <div class="footer">footer</div>
</body>
</html>
```





## 实现居中布局
### 水平居中
#### 行内元素水平居中
这里行内元素指文本text、图片img、按钮超链接等，只需要给父级元素设置text-align: center;即可实现。
```html
<style>
  .center {
    text-align: center;
  }
</style>
<div class="center">行内水平居中</div>
```
#### 块级元素水平居中
- <strong>定宽块级元素水平居中</strong><br>
只需给需要居中的块级元素加margin:0 auto即可，但这里需要注意的是，这里块状元素的宽度width值一定要有
```html
<style>
  .center {
    width: 100px;
    margin: 0 auto;
  }
</style>
<div>定宽水平居中</div>
```
- <strong>不定宽块级元素水平居中</strong>
  - <strong>设置display: table;</strong><br>
  通过给要居中显示的元素设置display: table; 然后再设置margin: 0 auto; 来实现。
  ```html
  <style>
    .center {
      display: table;
      margin: 0 auto;
    }
  </style>
  <div>不定宽水平居中</div>
  ```
  - <strong>设置display:inline-block;</strong><br>
  子元素设置display: inline-block; 父元素设置text: center; 来实现。（可以理解为转换成了上边的行内元素进行水平居中）
  ```html
  <style>
    .parent {
      text-algin: center;
    }
    .child {
      display: inline-block;
    }
  </style>
  <div class='parent'>
    <div class='child'>不定宽水平居中</div>
  </div>
  ```
  - <strong>设置flex布局</strong><br>
  只需把要处理的块状元素的父元素设置display:flex,justify-content:center;
  ```html
  <style>
    .parent {
      display: flex;
      justify-content: center;
    }
  </style>
  <div class='parent'>
    <div class='child'>不定宽水平居中</div>
  </div>
  ```
  - <strong>position + 负margin</strong><br>
  - <strong>position + margin：auto；</strong><br>
  - <strong>position + transform；</strong><br>
  注：这里方法4、5、6同下面垂直居中一样的道理，只不过需要把top/bottom改为left/right，在垂直居中部分会详细讲述。
#### 浮动元素水平居中
```html
<style>
  .content {
      float: left;
      width: 500px;
      position: relative; /* 设置 position: relative */
      left: 50%; /* 浮动方向偏移量（left 或者 right）设置为 50% */
      margin-left: -250px; /* 浮动方向上的 margin 设置为元素宽度一半乘以-1 */

  }
</style>
<div class="content">浮动元素水平居中</div>
```
#### 绝对定位元素水平居中
##### 方案一
1. 为元素设置宽度
2. 偏移量设置为 50%
3. 偏移方向外边距设置为元素宽度一半乘以-1
```html
<style>
  .content {
    position: absolute;
    width: 800px;
    left: 50%;
    margin-left: -400px;
  }
</style>
<div class="content">绝对定位元素水平居中</div>
```
##### 方案二：
1. 为元素设置宽度
2. 设置左右偏移量都为 0
3. 设置左右外边距都为 auto
```html
<style>
  .content {
    position: absolute;
    width: 800px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
</style>
<div class="content">绝对定位元素水平居中</div>
```

### 垂直居中
#### 单行文本垂直居中
设置paddingtop=paddingbottom；或 设置line-height=height；
#### 多行文本垂直居中
通过设置父元素table，子元素table-cell和vertical-align <br>
vertical-align:middle的意思是把元素放在父元素的中部
```html
<style>
  .parent {
    display: table;
  }
  .child {
    display: table-cell;
    vertical-align: middle;
  }
</style>

<div class='parent'>
  <div class='child'>多行文本垂直居中</div>
</div>
```
#### 块级元素垂直居中
- <strong>flex布局</strong><br>
在需要垂直居中的父元素上，设置display:flex和align-items：center<br>
要求：父元素必须显示设置height值
```html
<style>
  .parent {
    display: flex;
    align-items: center;
  }
</style>

<div class='parent'>
  <div class='child'>块级元素垂直居中</div>
</div>
```
- <strong>利用position和top和负margin</strong>(需知宽高)<br>
  - 设置元素为absolute/relative/fixed
  - margin=负一半
  ```html
  <style>
    .parent {
      height: 200px;
      width: 200px;
      position: relative;
    }
    .child {
      position: absolute;
      height: 100px;
      width: 100px;
      top: 50%;
      margin-top: -50px;
    }
  </style>

  <div class='parent'>
    <div class='child'>块级元素垂直居中</div>
  </div>
  ```
- <strong>利用position和top/bottom和margin:auto</strong>(注意不是margin:0 auto)<br>
  - position：absolute/relative/fixed
  - top/bottom：0
  - margin：auto
  ```html
  <style>
    .parent {
      position: relative;
    }
    .child {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  </style>

  <div class='parent'>
    <div class='child'>块级元素垂直居中</div>
  </div>
  ```
- <strong>利用position和top和transform</strong><br>
transform中translate偏移的百分比就是相对于元素自身的尺寸而言的。
```html
  <style>
    .parent {
      position: relative;
    }
    /*不用提前知道被居中元素的尺寸*/
    .child {
      position: absolute;
      top: 50%;
      transform: translate(0, 50%);
    }
  </style>

  <div class='parent'>
    <div class='child'>块级元素垂直居中</div>
  </div>
```
注意：
- 上述的块级垂直居中方法，稍加改动，即可成为块级水平居中方法，如top/bottom换成left/right
- transform方法，可用于未知元素大小的居中
### 水平垂直居中
#### 绝对定位+margin:auto
```css
div{
  width: 200px;
  height: 200px;
  background: green;
  position:absolute;
  left:0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```
#### 绝对定位+负margin
```css
div{
  width:200px;
  height: 200px;
  background:green;
  position: absolute;
  left:50%;
  top:50%;
  margin-left:-100px;
  margin-top:-100px;
}
```
#### 绝对定位+transform
```css
div{
  width: 200px;
  height: 200px;
  background: green;
  position:absolute;
  left:50%;    /* 定位父级的50% */
  top:50%;
  transform: translate(-50%,-50%); /*自己的50% */
}
```
#### flex布局
```css
.box{
  height:600px;
  display:flex;
  justify-content:center;  //子元素水平居中
  align-items:center;      //子元素垂直居中
    /* aa只要三句话就可以实现不定宽高水平垂直居中。 */
}
.box>div{
  background: green;
  width: 200px;
  height: 200px;
}
```
#### table-cell实现居中
设置:
```css
display:table-cell;
text-align:center;
vertical-align: middle;
```
[盘点8种CSS实现垂直居中](https://blog.csdn.net/freshlover/article/details/11579669)







## 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？
响应式网站设计（Responsive Web design）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。<br>
关于原理： 基本原理是通过媒体查询（@media）查询检测不同的设备屏幕尺寸做处理。<br>
关于兼容： 页面头部必须有mate声明的viewport。<br>
```html
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
```






## 一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度问题怎么解决？
方案一： .content { height: calc(100%-100px); }

方案二：.container { position:relative; } .content { position: absolute; top: 100px; bottom: 0; }

方案三：.container { display:flex; flex-direction:column; } .content { flex:1; }







## 一个满屏'品字'布局如何设计?
方法有挺多种，但是比较简单的方式就是： 上面的div宽度设置为100%，底下两个div设置成50%，并使用float或者inline使其保持在同一行即可（具体的样式可以自己微调）。如下:
```css
.content {
    width: 50%;
    height: 150px;
    margin: 0 auto;
}
.top {
    width: 40%;
    height: 50px;
    background-color: pink;
    margin-bottom: 50px;
    margin-left: 30%;
}
.left {
    width: 45%;
    height: 50px;
    background-color: pink;
    float: left;
}
.right {
    width: 45%;
    height: 50px;
    background-color: pink;
    float: right;
}

<div class="content">
    <div class="top"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>>
```






## 有哪几种高等布局？
- 假等高列：使用背景图片，在列的父元素上使用这个背景图进行Y轴的铺放，从而实现一种等高列的假象；
- 给容器的div使用单独的背景色（固定布局）（流体布局）：用元素中的最大高度撑起其他容器的高度；
- 创建带边框的两列等高布局： 用border-left来做，之鞥呢使用两列；
- 使用正padding和负margin对冲实现多列布局方法： 在所有列中使用的上，下padding和负的上，下margin，并在所有列外面加上一个- 容器，设置overflow： hidden，把溢出的背景切掉。
- 使用边框和定位模拟列等高： 但不能使用在多列；
- 模仿表格布局等高列效果： 兼容性不好，在ie6-7中无法正常运行；







## 单行文本溢出 & 多行文本溢出
### 单行文本溢出
#### css实现:
```css
  .text {
    overflow: hidden; /* 文字长度超出限定宽度，则隐藏超出的内容 */
    text-overflow: ellipsis; /* 规定当文本溢出时，显示省略符号来代表被修剪的文本 */
    white-space: nowrap; /* 设置文字在一行显示，不能换行 */
  }
```
### 多行文本溢出
#### css实现:
##### 按行数划分(兼容性不好)
```css
  .text {
    display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
    overflow: hidden; /* 文本溢出限定的宽度就隐藏内容 */
    -webkit-line-clamp: 2; /* 用来限制在一个块元素显示的文本的行数, 2 表示最多显示 2 行。 为了实现该效果，它需要组合其他的WebKit属性 */
    -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
    text-overflow: ellipsis; /* 多行文本的情况下，用省略号“…”隐藏溢出范围的文本 */
  }
```
##### 按高度划分(没有省略号)
```css
  .text {
    max-height: 40px;
    overflow: hidden;
    line-height: 20px;
  }
```
##### 按高度划分补充省略号
```css
.text {
  position: relative;
  max-height: 40px;
  overflow: hidden;
  line-height: 20px;
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 20px 0 10px;
    content: '...';
  }
}
```
#### js实现:
- 监听DOM尺寸变化
- 判断是否溢出：scrollHeight > offsetHeight
- 二分查找多行截取字符临界值（算法的解法：判断字符串是否溢出，二分查找字符串溢出临界子串，控制...显示）

### 手机上的多行省略
```css
.overflow-hidden{
    display: box !important;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;/*第几行出现省略号*/
    /*text-align:justify;不能和溢出隐藏的代码一起写，会有bug*/
}
```





##  css 中可以让文字在垂直和水平方向上重叠的两个属性是什么？
- 垂直方向： line-height；
- 水平方向： letter-spacing；
> 注意： letter-spacing还可以用来消除inline-block元素间的换行符空格间隙等问题。








## 左边固定宽度，右边自适应布局
- 左边定宽width：200px;设置浮动float:left;右边overflow：hidden（或者margin-left：左边宽度）；
- 父元素display：flex；左边定宽width：200px;；右边设置项伸展属性flex-grow: 1;
- 父元素position：relative；左边定宽width：200px;position：absolute；右边margin-left：左边宽度；
- 父元素display：table；左边定宽width：200px;右边width：100%；display:tabel-cell;。






## 实现左右两边固定宽度，中间自适应布局
- 使用flex布局：父元素display：flex；左边定宽width：200px；右边定宽width：200px；中间flex-grow：1；
- 使用浮动布局：父元素overflow：hidden；左边定宽width：200px；float：left；右边定宽width：200px；float：right；中间margin：0 200px；
- 使用绝对定位布局：
  - 绝对定位法原理是将左右两边使用absolute定位，因为绝对定位使其脱离文档流，后面的center会自然流动到他们上面，然后使用margin属性，留出左右元素的宽度，既可以使中间元素自适应屏幕宽度。
- 圣杯布局
  - 圣杯布局的原理是margin负值法。使用圣杯布局首先需要在center元素外部包含一个div，包含div需要设置float属性使其形成一个BFC，并设置宽度，并且这个宽度要和left块的margin负值进行配合







## 请解释一下 CSS3 的 Flexbox（弹性盒布局模型）以及适用场景？
概念： Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

适用场景： 任何一个容器都可以指定为Flex布局。Flexbox 用于不同尺寸屏幕中创建可自动扩展和收缩布局。
