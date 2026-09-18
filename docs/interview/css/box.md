---
publish: false
title: 盒模型
---
## 什么是盒模型
页面渲染时，DOM元素所采用的布局模型。可通过box-sizing进行设置。根据计算宽高的区域可分为：
- content-box (W3C标准盒模型)
![avatar](https://static.scar.vip/image/content-box.png)
从图看：W3C标准盒模型(content-box)包括margin、border、padding、content，并且content部分不包含其他部分。
- border-box (IE怪异盒模型)
![avatar](https://static.scar.vip/image/border-box.png)
从图看：IE怪异盒模型(border-box)包括margin、border、padding、content，但content部分包含了border 和 padding

> - padding-box (FireFox曾经支持)
> - margin-box (浏览器未实现)

### css设置两种模型
```css
box-sizing: content-box;
box-sizing: border-box;
```
### JS获取盒模型对应宽高
```js
dom.style.width/height;
dom.currentStyle.width/height; (IE支持)
window.getComputedStyle(dom).width/height;
dom.getBoundingClientRect().width/height;
```





## BFC、IFC、GFC、FFC是什么？
- Block formatting context(BFC)--块级格式化上下文；
- Inline formatting context(IFC)--内联格式化上下文；
- Grid formatting context(GFC)--网格布局格式化上下文；
- Flex formatting context(FFC)--自适应格式化上下文；
### BFC
BFC是用于布局块级盒子的一块独立的渲染区域，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响，反之亦然。<br>
BFC是web页面CSS视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。<br>
BFC规定了内部的Block Box如何布局。一个页面是由很多个Box组成的，元素的类型和display属性，决定了这个Box的类型。不同类型的box，会参与不同的Formatting Context（决定如何渲染文档的容器），因此Box内的元素会以不用的方式渲染，也是就是说BFC内部的元素和外部的元素不会相互影响。<br>
> IE下为Layout，可通过zoom: 1 触发。
#### BFC的特点原理：
1. BFC这个元素的垂直的边距会发生重叠
2. BFC的区域不会与浮动元素的float重叠
3. 独立的容器，内外元素互不影响
4. 计算BFC高度，浮动元素也参与计算
#### 如何创建BFC：
- float不为none的时候
- position不为static或relative的时候
- display与table相关的时候
- overflow为auto，hidden的时候
#### BFC规则：
- 属于同一个BFC的相邻box垂直排列
- 属于同一个BFC的相邻box的margin会发生重叠
- BFC中子元素的margin box的左边，与包含块(BFC)border box的左边相接触(子元素absolute除外)
- BFC的区域不会与float的元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，环绕与周围
#### BFC的应用：
- 阻止相邻元素的margin重叠
- 可以包含浮动元素———清除内部浮动(清除浮动的原理是两个div都位于同一个BFC区域之中)
- 可以阻止元素被浮动元素覆盖
- 自适应两栏布局
- 阻止浏览器因为四舍五入造成的多列布局换行情况
#### BFC的约束规则/定位方案
- 内部的元素会在垂直方向上一个接着一个的放置。
- 计算BFC的高度时，需要注意浮动元素也参与计算；
- Box垂直方向的距离由margin决定。注意：属于同一个BFC的两个相邻的Box的margin会发生重叠；
- 生成BFC元素的子元素中，每一个子元素的margin与包含块的左边界border相接触（对于从左到右的格式化，否则相反），就算是在浮动中也一样；
- BFC的区域不会与float box重叠。
- BFC相当于页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，相反也一样。
#### BFC触发条件：
- 根元素变化，即HTML
- position 值为 absolute / fixed
- float的值不为none(默认)
- overflow !== visible(默认)
- display 值为 inline-block / table-cell / table-caption
#### BFC布局与普通文档流布局区别：
普通文档流布局规则：
- 浮动的元素是不会被父级计算高度；
- 非浮动元素会覆盖浮动元素的位置；
- margin会传递给父级；
- 两个相邻元素上下margin会重叠；

BFC布局规则
- 浮动的元素会被父级计算高度（父级触发了BFC）；
- 非浮动元素不会覆盖浮动元素位置（非浮动元素触发了BFC）；
- margin不会传递给父级（父级触发了BFC）；
- 两个相邻元素上下margin会重叠（给其中一个元素增加一个父级，然后让他的父级触发BFC）；

### IFC
IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响) IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同。 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。 那么IFC一般有什么用呢？ 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

IFC布局规则：
框会从包含块的顶部开始，一个接一个地水平摆放。 摆放这些框的时候，它们在水平方向上的外边距、边框、内边距所占用的空间都会被考虑在内。在垂直方向上，这些框可能会以不同形式来对齐：它们可能会把底部或顶部对齐，也可能把其内部的文本基线对齐。能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框。水平的margin、padding、border有效，垂直无效。不能指定宽高。 行框的宽度是由包含块和存在的浮动来决定。行框的高度由行高计算这一章所描述的规则来决定。


### GFC
GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。 那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

### FFC
FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。 Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。 伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

[详解BFC、IFC、GFC、FFC](https://juejin.cn/post/6844904117056323597)
[到底什么是 BFC、IFC、GFC 和 FFC](https://juejin.cn/post/6844903480801525773)


## z 轴上的默认层叠顺序如下（从下到上）：
1. 根元素的边界和背景
2. 常规流中的元素按照 html 中顺序
3. 浮动块
4. positioned 元素按照 html 中出现顺序





## 层叠上下文
元素提升为一个比较特殊的图层，在三维空间中(z轴)高出普通元素一等。

触发条件：
- 根层叠上下文(html)
- position
- css3属性
  - flex
  - transform
  - opacity
  - filter
  - will-change
  - -webkit-overflow-scrolling

层叠等级：层叠上下文在z轴上的排序
- 在同一层叠上下文中，层叠等级才有意义
- z-index的优先级最高
![avatar](https://static.scar.vip/image/stack.png)




## 如何创建 stacking context：
1. 根元素
2. z-index 不为 auto 的定位元素
3. opacity 小于 1 的元素
4. 在移动端 webkit 和 chrome22+，z-index 为 auto，position: fixed 也将创建新的 stacking context






## css stacking 是什么，它是怎么做的？


