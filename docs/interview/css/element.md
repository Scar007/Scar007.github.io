---
title: 元素
---
## 什么是CSS浮动？
在非IE浏览器（如Firefox）下，当容器的高度为auto，且容器的内容中有浮动（float为left或right）的元素，在这种情况下，容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响（甚至破坏）布局的现象。这个现象叫浮动溢出，为了防止这个现象的出现而进行的CSS处理，就叫CSS清除浮动。

### 浮动元素的特点
- 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）；
- 浮动元素碰到包含它的边框或其他浮动元素的边框停留
- 浮动元素碰到包含他的边框或者浮动元素的边框停留。
- 由于浮动元素不在文档流之中，文档流的块级框会表现的就像浮动框不存在一样。
- 浮动 元素会漂浮在文档流的块级框之上。
### 浮动会带来的问题：
- 父级元素的高度将会无法被撑开，会影响与父级元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构
### 清除浮动方法：
- <strong>方法一：增加空元素标签</strong><br>
在浮动元素后使用一个空元素如\<div class="clear">`</div>`，并在CSS中赋予.clear{clear:both;}属性即可清理浮动。亦可使用\<br class="clear" />或\<hr class="clear" />来进行清理。
```css
.news {
  background-color: gray;
  border: solid 1px black;
}

.news img {
  float: left;
}

.news p {
  float: right;
}

.clear {
  clear: both;
}

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
<div class="clear"></div>
</div>
```
优点：简单，代码少，浏览器兼容性好。

缺点：需要添加大量无语义的html元素，代码不够优雅，后期不容易维护。

- <strong>方法二：使用CSS的overflow属性</strong><br>
给浮动元素的容器添加overflow:hidden;或overflow:auto;可以清除浮动，另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom:1。在添加overflow属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果。
```css
.news {
  background-color: gray;
  border: solid 1px black;
  overflow: hidden;
  *zoom: 1;
}

.news img {
  float: left;
}

.news p {
  float: right;
}

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```
- <strong>方法三：给浮动的元素的容器添加浮动</strong><br>
给浮动元素的容器也添加上浮动属性即可清除内部浮动，但是这样会使其整体浮动，影响布局，不推荐使用。
- <strong>方法四：使用邻接元素处理</strong><br>
什么都不做，给浮动元素后面的元素添加clear属性。
```css
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

.content{
  clear:both;
}

<div class="news">
<img src="news-pic.jpg" />
<p>some text</p>
<div class="content">***</div>
</div>
```
注意这里的div.content有内容。
- <strong>方法五：使用CSS的:after伪元素</strong><br>
结合 :after 伪元素（注意这不是伪类，而是伪元素，代表一个元素之后最近的元素）和 IEhack ，可以完美兼容当前主流的各大浏览器，这里的 IEhack 指的是触发 hasLayout。
给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个:after伪元素实现元素末尾添加一个看不见的块元素（Block element）清理浮动。
```css
.news {
  background-color: gray;
  border: solid 1px black;
}

.news img {
  float: left;
}

.news p {
  float: right;
}

.clearfix:after{
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}

<div class="news clearfix">
<img src="news-pic.jpg" />
<p>some text</p>
</div>
```
通过CSS伪元素在容器的内部元素最后添加了一个看不见的空格"020"或点"."，并且赋予clear属性来清除浮动。需要注意的是为了IE6和IE7浏览器，要给clearfix这个class添加一条zoom:1;触发haslayout。

<strong>总结：</strong><br>
按照上面的栗子，清除浮动的方法可以分成两类：
- 一是利用 clear 属性，包括在浮动元素末尾添加一个带有 clear: both 属性的空 div 来闭合元素，其实利用 :after 伪元素的方法也是在元素末尾添加一个内容为一个点并带有 clear: both 属性的元素实现的。
- 二是触发浮动元素父元素的 BFC (Block Formatting Contexts, 块级格式化上下文)，使到该父元素可以包含浮动元素，关于这一点。

在网页主要布局时使用:after伪元素方法并作为主要清理浮动方式；<br>
在小模块如ul里使用overflow:hidden;（留意可能产生的隐藏溢出元素问题）；<br>
如果本身就是浮动元素则可自动清除内部浮动，无需格外处理；正文中使用邻接元素清理之前的浮动；<br>
最后可以使用相对完美的:after伪元素方法清理浮动，文档结构更加清晰。






## 绝对定位和浮动的区别和应用？
绝对定位： 绝对定位脱离标准文档流，它的参考点是文档的左上角或者是右上角。如果有任何父元素有定位属性，此时就可以参考“子绝父相”定律来设置自己的定位参考元素。在网页制作过程中很灵活。制作覆盖效果的时候，会大量使用绝对定位。

浮动： 浮动脱离标准文档流，通常用于制作并排显示的元素，通常用于大的布局，或者无序列表比如图片的并排。可以使用clear:both属性让标准流中的其他元素在此之后依次排列。





## 如何确定一个元素的包含块(containing block)
1. 根元素的包含块叫做初始包含块，在连续媒体中他的尺寸与 viewport 相同并且 anchored at the canvas origin；对于 paged media，它的尺寸等于 page area。初始包含块的 direction 属性与根元素相同。
2. position为relative或者static的元素，它的包含块由最近的块级（display为block,list-item, table）祖先元素的内容框组成
3. 如果元素position为fixed。对于连续媒体，它的包含块为 viewport；对于 paged media，包含块为 page area
4. 如果元素position为absolute，它的包含块由祖先元素中最近一个position为relative,absolute或者fixed的元素产生，规则如下：
  - 如果祖先元素为行内元素，the containing block is the bounding box around the padding boxes of the first and the last inline boxes generated for that element.
  - 其他情况下包含块由祖先节点的padding edge组成

如果找不到定位的祖先元素，包含块为初始包含块







## 有哪几种隐藏元素的方法？
- visibility: hidden; 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在；
- opacity: 0;``CSS3属性，设置0可以使一个元素完全透明；
- position: absolute; 设置一个很大的 left 负值定位，使元素定位在可见区域之外；
- display: none; 元素会变得不可见，并且不会再占用文档的空间；
- transform: scale(0); 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留；
- \<div hidden="hidden"> HTML5属性,效果和display:none;相同，但这个属性用于记录一个元素的状态；
- height: 0; 将元素高度设为 0 ，并消除边框；
- filter: blur(0); CSS3属性，括号内的数值越大，图像高斯模糊的程度越大，到达一定程度可使图像消失（此处感谢小伙伴支持）；






## 元素竖向的百分比设定是相对于容器的高度吗？
一般来说，子元素的百分比单位都是以父元素为依据。但是margin和padding例外。元素的height是相对于容器的高度，但是元素的margin和padding是相对于容器的宽度。






## 将多个元素设置为同一行？
将多个元素设置为同一行的方法： 使用float或inline-block；