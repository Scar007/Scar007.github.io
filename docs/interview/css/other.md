---
title: 其他
---
## 用css画一个三角形

原理：<strong>利用border实现</strong>，当div 的宽高为0，存在边框的时候，四条边框的中心将会是一个点，通过设置其他三条边框的透明度，实现三角形。
```css
div{
  width:0;
  height:0;
  border-width:10px;
  border-style:solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: red;
}
```


## 如何在页面上实现一个圆形的可点击区域？
- 方案一：svg
- 方案二：border-radius
- 方案三：纯js实现 需要求一个点在不在圆上简单算法、获取鼠标坐标等等





## 如何解决一像素问题
### 思路一：边框设置背景 background-image 和 border-image
```css
.background-image-1px {
  background: url(...) no-repeat left bottom;
  -webkit-background-size: 100% 100%;
  background: 100% 100%;
}
.border-bottom--image-1px {
  border-width: 0 0 1px 0;
  -webkit-border-image: url(...) 0 0 2 0 stretch;
  border-image: url(...) 0 0 2 0 stretch;
}
```
优势：解决了问题 <br/>
不足：换图片会比较麻烦，且处理图片有可能出现模糊问题

### 思路二：box-shadow
```css
.box-shadow-1px {
  box-shadow: inset 0px -1px 1px -1px #ccc;
}
```
优势：代码量少，比上边的图片修改起来更方便快捷 <br/>
不足：阴影导致的颜色变迁，而且仔细看可以看出是阴影而非边框

### 思路三：伪元素 + scale缩放
```scss
@border-color-base: #ccc;
// 伪元素的位置控制
.scale-hairline-common(@color, @top, @right, @bottom, @left) {
  content: '';
  position: absolute;
  background-color: @color;
  display: block;
  z-index: 1;
  top: @top;
  right: @right;
  bottom: @bottom;
  left: @left;
}

//上边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'top') {
  border-top: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-top: none;

      &::before {
        .scale-hairline-common(@color, 0, auto, auto, 0);
        width: 100%;
        height: 1PX;
        transform-origin: 50% 50%;
        transform: scaleY(0.5);

        @media (min-resolution: 3dppx) {
          transform: scaleY(0.33);
        }
      }
    }
}

// 右边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'right') {
  border-right: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-right: none;

      &::after {
        .scale-hairline-common(@color, 0, 0, auto, auto);
        width: 1PX;
        height: 100%;
        background: @color;
        transform-origin: 100% 50%;
        transform: scaleX(0.5);

        @media (min-resolution: 3dppx) {
          transform: scaleX(0.33);
        }
      }
    }
}

// 下边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'bottom') {
  border-bottom: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-bottom: none;
      &::after {
        .scale-hairline-common(@color, auto, auto, 0, 0);
        width: 100%;
        height: 1PX;
        transform-origin: 50% 100%;
        transform: scaleY(0.5);
        @media (min-resolution: 3dppx) {
          transform: scaleY(0.33);
        }
      }
    }
}

// 左边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'left') {
  border-left: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-left: none;

      &::before {
        .scale-hairline-common(@color, 0, auto, auto, 0);
        width: 1PX;
        height: 100%;
        transform-origin: 100% 50%;
        transform: scaleX(0.5);

        @media (min-resolution: 3dppx) {
          transform: scaleX(0.33);
        }
      }
    }
}

// 全边框
.hairline(@direction, @color: @border-color-base, @radius: 0) when (@direction = 'all') {
  border: 1PX solid @color;
  border-radius: @radius;

    @media (min-resolution: 2dppx) {
      position: relative;
      border: none;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1PX solid @color;
        border-radius: @radius * 2;
        transform-origin: 0 0;
        transform: scale(0.5);
        box-sizing: border-box;
        pointer-events: none;
      }
    }
}
```






## 怎样处理 移动端 1px 被 渲染成 2px 问题？
#### 局部处理
- mate标签中的 viewport属性 ，initial-scale 设置为 1
- rem 按照设计稿标准走，外加利用transfrome 的scale(0.5) 缩小一倍即可；
#### 全局处理
- mate标签中的 viewport属性 ，initial-scale 设置为 0.5
- rem 按照设计稿标准走即可





## 如何在图片上面打码？
主要通过canvas的合成属性：<br>
[使用canvas一步步实现图片打码功能](https://github.com/MY729/front-common-funtion/blob/master/picture-code-demo/README.md)






## 实现条纹网格的方式有哪些？
方式一：nth-child(even/odd)<br>
odd表示基数，even表示偶数行
```css
.row:nth-child(odd){
    background: #eee;
}
```
方式二：nth-of-type(odd)
```css
.row:nth-of-type(odd){
    background: #eee;
}
```
方式三：渐变实现linear-gradient
```css
.stripe-bg{
  padding: .5em;
  line-height: 1.5em;
  background: beige;
  background-size: auto 3em;
  background-origin: content-box;
  background-image: linear-gradient(rgba(0,0,0,.2) 50%, transparent 0);
}
```






## 如何修改chrome记住密码后自动填充表单的黄色背景 ？
```css
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
  background-color: rgb(250, 255, 189); /* #FAFFBD; */
  background-image: none;
  color: rgb(0, 0, 0);
}
```






## CSS优化、提高性能的方法有哪些？
- 多个css可合并，并尽量减少http请求
- 属性值为0时，不加单位
- 将css文件放在页面最上面
- 避免后代选择符，过度约束和链式选择符
- CSS的样式尽可能的采取缩写形式，例如给盒子margin，padding值等；
- 避免不必要的重复
- 使用语义化命名，便于维护
- 尽量少的使用!impotrant，可以选择其他选择器
- 精简规则，尽可能合并不同类的重复规则
- 遵守盒子模型规则
- 适当减少使用不必要的并行规则，例如content.left{...},content.right{...}等，直接用.left{...},.right{...}代替会更加快；
- 尽量减少规则层数，层数越多，定位越慢(非常慢)，使用一个有语义的选择器往往能够取得更好的效率；
- 利用好css属性的继承机制；
- 尽量减少重布局以及重绘；
- 提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;
- 使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；
- 尽量的避免使用expression表达式[IE]以及filter属性[IE]；







## CSS预处理器/后处理器是什么？为什么要使用它们？
预处理器，如：less，sass，stylus,用来预编译sass或者less，增加了css代码的复用性，还有层级，mixin， 变量，循环， 函数等，对编写以及开发UI组件都极为方便。

后处理器， 如： postCss,通常被视为在完成的样式表中根据css规范处理css，让其更加有效。目前最常做的是给css属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

css预处理器为css增加一些编程特性，无需考虑浏览器的兼容问题，我们可以在CSS中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让我们的css更加的简洁，增加适应性以及可读性，可维护性等。

其它css预处理器语言：Sass（Scss）, Less, Stylus, Turbine, Swithch css, CSS Cacheer, DT Css。

使用原因：
- 结构清晰， 便于扩展
- 可以很方便的屏蔽浏览器私有语法的差异
- 可以轻松实现多重继承
- 完美的兼容了CSS代码，可以应用到老项目中






## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。






## rgba() 和 opacity 的透明效果有什么不同？
opacity 作用于元素以及元素内的所有内容（包括文字）的透明度；

rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果；







## 抽离样式模块怎么写？述其思路。
可将css拆分成两部分： 公共CSS和业务CSS。

网站的配色，字体，交互提取出为公共的CSS。这部分的CSS命名不应涉及具体的业务。对于业务CSS，需要有统一的命名，使用公共的前缀。






## 在网页中的应该使用奇数还是偶数的字体？
在网页中的应该使用“偶数”字体：
- 偶数字号相对更容易和 web 设计的其他部分构成比例关系
- 使用奇数号字体时文本段落无法对齐
- 宋体的中文网页排布中使用最多的就是 12 和 14







## 什么是外边距重叠？ 重叠的结果是什么？
首先，外边距重叠就是 margin-collapse。相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。 这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距。

规则如下：
- 两个或多个毗邻的普通流中的块元素垂直方向上的margin会折叠；
- 浮动元素或inline-block元素或绝对定位元素的margin不会和垂直方向上的其他元素的margin折叠；
- 创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠；
- 元素自身的margin-bottom和margin-top相邻时也会折叠；


折叠结果遵循下列计算原则：
- 两个相邻的外面边距是正数时，折叠结果就是他们之中的较大值；
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值；
- 两个外边距一正一负时，折叠结果是两者的相加的和；






## li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
li排列受到中间空白(回车/空格)等的影响，因为空白也属于字符，会被应用样式占据空间，产生间隔。

解决办法：
- 在ul中用font-size：0（谷歌不支持）；可以使用letter-space：-3px;
- 设置float：left；







## 视差滚动效果以及如何实现？
视差滚动（Parallax Scrolling）指网页滚动过程中，多层次的元素进行不同程度的移动，视觉上形成立体运动效果的网页展示技术（3D效果）。

实现方式：
- CSS3实现： 优点是开发时间相对较短，性能和开发效率比较好。缺点是不能兼容到低版本的浏览器；
- JQuery实现：（通过控制不同层滚动速度，计算每一层的时间）优点是能兼容到各个版本，效果可控性好，缺点是开发起来对制作者的要求较高；
- 插件实现方式： 例如使用parallax-scrolling,兼容性十分好；







## 怎么让Chrome支持小于12px 的文字？
```css
.shrink {
    -webkit-transform: scale(0.8);
    -o-transform: scale(1);
    display: inilne-block;
}
```





## 如何解决特定浏览器的样式问题？
建议方案： 主张向前兼容，不考虑向后兼容。根据产品的用户群中各大浏览器，来考虑需要兼容的浏览器。

可以把浏览器分为两类： 一类是历史遗留浏览器，一类是现代浏览器。根据这个分类开发两个版本的网站，然后自己来定义哪些浏览器是历史遗留版本。

在用户使用历史遗留版本的时候，通过通告栏告知用户使用现代浏览器，获取更多的功能，拥有更好的用户体验等（升级）。当用户的浏览器不能兼容时，提示用户只是使用什么版本的浏览器才能使用网站（下载可以兼容的浏览器）。

注意：项目开始前就需要确认兼容支持的最低版本是多少，以此设计一个对应的兼容方案。







## 浏览器如何判断元素是否匹配某个CSS选择器？
浏览器先产生一个集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到这个选择器都匹配完，还在集合中的元素就匹配这个选择器了。







## 当float和margin同时使用时，如何解决IE6的双倍边距？
当浮动的方向和margin是同方向的时候，此时IE6会在这个方向的第一个元素身上产生双倍margin。

解决办法：
（1）、改变margin的方向，float:left; margin-right:20px;  浮动向左，margin向右；<br>
（2）、给第一个元素单独写一个类叫做.content, 此时.content{_margin-left:一半的margin;}；<br>
（3）、用display:inline;不用浮动了（哈哈哈哈）。<br>






## CSS怎样判断不同分辨率显示不同宽度布局，从而实现自适应宽度？
- 使用百分比布局，用百分比来写宽度、marign、padding；
- 使用rem做单位，适当的写js``让html根元素的字号随着浏览器宽度的变化而等比例变化；
- 使用媒体查询让不同宽度的浏览器使用不同的样式表。






## 如何优化网页的打印样式？
```css
<link rel="stylesheet" type="text/css" media="screen(或者print、tv等) href="aaa.css">
```
注意，在打印样式表也应该注意以下几点：
- 打印样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景图。如果坚持要显示图片，可以使用html插入到页面中；
- 最好不要使用像素作为单位，因为打印样式表要打印出来的是实物，建议使用pt/cm;
- 隐藏掉不必要的内容。（如@print content{display: none}）;
- 打印样式表中不建议使用浮动属性（建议少用），因为它们会消失。






## React Native中的样式与css的区别？
- React Native 的样式基本上是实现了 CSS 的一个子集，并且属性名不完全一致，所以当你开始在考虑兼容 React Native 端之前，- 可以先简要了解一下 React Native 的样式。
- 这些样式名基本上是遵循了 web 上的 CSS 的命名，只是按照 JS 的语法要求使用了驼峰命名法。
- RN使用 JavaScript 来写样式，所有核心组件都接受名为style的属性，相当于css的行内样式。
- 在 React Native 中使用 Flexbox 规则来指定某个组件的子元素的布局。Flexbox 可以在不同屏幕尺寸上提供一致的布局结构。因- 此，如果你要考虑 React Native 端，那你的样式布局就得采用 Flex 布局。






## css样式引入方式的优缺点对比
- 内嵌样式： 优点： 方便书写，权重高；缺点： 没有做到结构和样式分离；
- 内联样式： 优点：结构样式相分离； 缺点：没有彻底分离；
- 外联样式： 优点： 完全实现了结构和样式相分离； 缺点： 需要引入才能使用；






## border:none;与border:0;有什么区别？
首先是性能差异：
- {border：0;}: 把border设置为0像素，虽然在页面上看不到，但是按border默认值理解，浏览器依然对border-width/border-color进行了渲染，即已经占用内存值；
- {border：none；}被理解为border-style:none。boder:0;比border:none多渲染了一个border-width:0,也就是为什么border:none的性能要比border:0高；

兼容性差异：
- {border:none;}当border为“none”时似乎对IE6/7无效边框依然存在当border为“0”时，感觉比“none”更有效，所有浏览器都一致把边框隐藏。








## 什么是 FOUC(Flash of Unstyled Content))?如何避免
当使用@import导入CSS时，会导致某些页面在IE出现奇怪的现象： 没有样式的页面内容显示瞬间闪烁，这种现象被称为“文档样式暂时失效”，简称FOUC。

产生原因： 当样式表晚于结构性html加载时，加载到此样式表时，页面将会停止之前的渲染。等待此样式表被下载和解析后，再重新渲染页面，期间导致短暂的花屏现象。

解决办法： 只要在\<head>之间加入一个\<link>或者\<script>``\</script>元素即可。





## css sprite 是什么，有什么优缺点？
概念：将多个小图片拼接到一个图片中。通过 background-position 和元素尺寸调节需要显示的背景图案。

css精灵图，把一堆小的图片整合到一张大的图片（png）上，利用CSS的“background-image”，“background- repeat”``，“background-position”的组合进行背景定位background-position可以用数字能精确的定位出背景图片的位置，减轻服务器对图片的请求数量。
### 优点：
- 减少 HTTP 请求数，极大地提高页面加载速度
- 增加图片信息重复度，提高压缩比，减少图片大小
- 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

### 缺点：
- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- CSSSprites在开发的时候相对来说有点麻烦，需要借助photoshop或其他工具来对每个背景单元测量其准确的位置。
- 维护方面：CSS Sprites在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的CSS，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动CSS。

拓展： 目前网站开发所用的精灵图（如字体库）一般都是直接用云端，而不是采用这种本地的了，如阿里图标库等。





## specified value,computed value,used value 计算方法
### specified value: 计算方法如下：
1. 如果样式表设置了一个值，使用这个值
2. 如果没有设值，且这个属性是继承属性，从父元素继承
3. 如果没有设值，并且不是继承属性，则使用 css 规范指定的初始值

### computed value
以 specified value 根据规范定义的行为进行计算，通常将相对值计算为绝对值，例如 em 根据 font-size 进行计算。一些使用百分数并且需要布局来决定最终值的属性，如 width，margin。百分数就直接作为 computed value。line-height 的无单位值也直接作为 computed value。这些值将在计算 used value 时得到绝对值。computed value 的主要作用是用于继承

### used value
属性计算后的最终值，对于大多数属性可以通过 window.getComputedStyle 获得，尺寸值单位为像素。以下属性依赖于布局
- background-position
- bottom, left, right, top
- height, width
- margin-bottom, margin-left, margin-right, margin-top
- min-height, min-width
- padding-bottom, padding-left, padding-right, padding-top
- text-indent







## css2.0 和css3.0对比有什么不同？
行内元素：和有他元素都在一行上，高度、行高及外边距和内边距都不可改变，文字图片的宽度不可改变，只能容纳文本或者其他行内元素；

块级元素：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；

空元素：在HTML元素中，没有内容的 HTML 元素被称为空元素。空元素是在开始标签中关闭的。<br> 就是没有关闭标签的空元素。





## 描述css reset的作用和用途？
Reset重置浏览器的CSS默认属性，浏览器的品种不同，样式不同时，将他们重置，让他们统一。






## 什么是critical CSS？
Critical CSS是一种提取首屏中 CSS 的技术，以便尽快将内容呈现给用户。这是快速加载网页首屏的好方法。

核心思路：
1. 抽取出首页的CSS；
2. 用行内css样式，加载这部分的css(critical CSS);
3. 等到页面加载完之后，再加载整个css，会有一部分css与critical css重叠；






## 为什么要初始化CSS样式？
因为浏览器的兼容问题，不同浏览器对标签的默认值是不同的，如果没有对浏览器的CSS初始化，会造成相同页面在不同浏览器的显示存在差异。






## 两个div垂直布局，上面的设置margin—bottom:50px;下面的margin-top:100px;此时两个div相距多少？
100px,因为垂直方向的margin会存在margin塌陷。
