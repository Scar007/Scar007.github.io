---
publish: false
title: 属性
---
## CSS 有哪些继承属性？
- 关于文字排版的属性如：
  - font
  - word-break
  - letter-spacing
  - text-align
  - text-rendering
  - word-spacing
  - white-space
  - text-indent
  - text-transform
  - text-shadow
- line-height
- color
- visibility
- cursor





## offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别
- offsetWidth/offsetHeight 返回值包含content + padding + border，效果与 e.getBoundingClientRect()相同
- clientWidth/clientHeight 返回值只包含content + padding，如果有滚动条，也不包含滚动条
- scrollWidth/scrollHeight 返回值包含content + padding + 溢出内容的尺寸
![avatar](https://static.scar.vip/image/offset-client-scroll.jpeg)






## position的值relative和absolute定位原点是？
<strong>absolute</strong>
生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。

<strong>fixed （老IE不支持）</strong>
生成绝对定位的元素，相对于浏览器窗口进行定位。

<strong>relative</strong>
生成相对定位的元素，相对于其正常位置进行定位。

<strong>static</strong>
默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。

<strong>inherit</strong>
规定从父元素继承 position 属性的值。

使用position时，有一个重要规律：<strong>子绝父相</strong>





## position:fixed;在手机端下无效怎么处理？
fixed的元素实现相对于整个页面是固定位置的，当在屏幕上滑动时是在滑动整个viewport。原来的网页还在，fixed也没有变过位置，所以说并不是手机端不支持fixed，只是fixed元素不是相对于手机屏幕固定的，因此我们按照以下方式来设计：
```css
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
```





## position 跟 display、overflow、float 这些特性相互叠加后会怎么样？
- display属性规定元素应该生成的框的类型；
- position属性规定元素的定位类型；
- float属性是一种布局方式，定义元素往哪个方向浮动；

叠加结果：有点类似于优先机制。position的值-- absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float或者absolute定位的元素，只鞥是块元素或者表格.






## position的absolute与fixed共同点与不同点？
相同点：
- 改变行内元素的呈现方式，display被设置为block；
- 让元素脱离普通流，不占据空间；
- 默认会覆盖到非定位元素上；

不同点：
- absolute的“根元素”是可以设置的，而fixed的“根元素”固定为浏览器窗口；
- 当滚动网页时，fixed元素与浏览器窗口之间的距离是不变的。





## display有哪些值？他们的作用是什么？
值                 | 	作用
-------------------|----------------------
none            	 | 使用后元素将不会显示
grid               |	定义一个容器属性为网格布局
flex               |	定义一个弹性布局
block              |	使用后元素将变为块级元素显示，元素前后带有换行符
inline             |	display默认值。使用后原色变为行内元素显示，前后无换行符
list-item	         | 使用后元素作为列表显示
run-in             |	使用后元素会根据上下文作为块级元素或行内元素显示
table              |	使用后将作为块级表格来显示（类似\<table>），前后带有换行符
inline-table       |	使用后元素将作为内联表格显示（类似\<table>），前后没有换行符
table-row-group	   | 元素将作为一个或多个行的分组来显示（类似\<tbody>）
table-hewder-group |	元素将作为一个或多个行的分组来表示（类似\<thead>）
table-footer-group |	元素将作为一个或多个行分组显示（类似\<tfoot>）
table-row          |	元素将作为一个表格行显示（类似\<tr>）
table-column-group |	元素将作为一个或多个列的分组显示（类似\<colgroup>）
table-column	     | 元素将作为一个单元格列显示（类似\<col>）
table-cell         |	元素将作为一个表格单元格显示（类似\<td>和\<th>）
table-caption      |	元素将作为一个表格标题显示（类似\<caption>）
inherit            |	规定应该从父元素集成display属性的值
其中，常用的有：block， inline-block， none， table， line。






## display: none;与visibility: hidden; 有何异同？
### 联系
它们都能让元素不可见
### 区别：
- display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染时元素继续占据空间，只是内容不可见。
- display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility: hidden;是继承属性，子孙节点由于继承了 hidden 而消失，通过设置 visibility: visible，可以让子孙节点显示。
- 修改常规流中元素的 display 通常会造成文档重排。修改 visibility 属性只会造成本元素的重绘。
- 读屏器不会读取 display: none;元素内容；会读取 visibility: hidden;元素内容。






## 设置元素浮动后，该元素的 display 值会如何变化？
设置元素浮动后，该元素的display值自动变成block。





## margin塌陷
1. 两个或多个毗邻的普通流中的块元素垂直方向上的 margin 会折叠
2. 浮动元素/inline-block 元素/绝对定位元素的 margin 不会和垂直方向上的其他元素的 margin 折叠
3. 创建了块级格式化上下文的元素，不会和它的子元素发生 margin 折叠
4. 元素自身的 margin-bottom 和 margin-top 相邻时也会折叠






## margin和padding分别适合什么场景使用？
需要在border外侧添加空白且空白处不需要背景（色），或上下相连的两个盒子之间的空白需要相互抵消时，可以使用margin；

需要在border内侧添加空白且空白处需要背景（色），或上下相连的两个盒子之间的空白，希望等于两者之和时，可以使用padding。





## display、float、position的关系
- 如果display为 none，那么 position 和 float 都不起作用，这种情况下元素不产生框
- 否则，如果 position 值为 absolute 或者 fixed，框就是绝对定位的，float 的计算值为 none，display 根据下面的表格进行调整。
- 否则，如果 float 不是 none，框是浮动的，display 根据下表进行调整
- 否则，如果元素是根元素，display 根据下表进行调整
- 其他情况下 display 的值为指定值 总结起来：绝对定位、浮动、根元素都需要调整display





## display: block;和display: inline;的区别？
### block块级元素特点：

1. 处于常规流中时，如果width没有设置，会自动填充满父容器
2. 可以应用margin/padding
3. 在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4. 处于常规流中时布局时在前后元素位置之间（独占一个水平空间） 5.忽略vertical-align

### inline行内元素特点：
1. 水平方向上根据direction依次布局
2. 不会在元素前后进行换行
3. 受white-space控制
4. margin/padding在竖直方向上无效，水平方向上有效
5. width/height属性对非替换行内元素无效，宽度由元素内容决定
6. 非替换行内元素的行框高由line-height确定，替换行内元素的行框高由height,margin,padding,border决定 6.浮动或绝对定位时会转换为block
7. vertical-align属性生效






## display:inline-block 什么时候会显示间隙？
- 有空格时候会有间隙， 可以删除空格解决；
- margin正值的时候， 可以让margin使用负值解决；
- 使用font-size时候，可通过设置font-size:0、letter-spacing、word-spacing解决；






## css 属性 content 有什么作用？
content 属性专门应用在 before/after 伪元素上，用于插入额外内容或样式。






## CSS属性overflow属性定义溢出元素内容区的内容会如何处理?
- 参数是scroll的时候，一定会出滚动条；
- 参数是auto的时候，子元素内容大于父元素时出现滚动条；
- 参数是visible的时候，溢出的内容出现在父元素之外；
- 参数是hidden的时候，溢出隐藏；






## css禁用鼠标事件
```css
.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
```





## css禁止用户选择
```css
body{
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
```





## 让页面里的字体变清晰，变细用CSS怎么做？
```css
-webkit-font-smoothing: antialiased;
```
-webkit-font-smoothing 在 window 系统下没有起作用，但是在 IOS 设备上起作用 -webkit-font-smoothing：antialiased 是最佳的，灰度平滑。




## 让overflow:scroll平滑滚动？
```css
-webkit-overflow-scrolling: touch;
```






## 长时间按住页面闪退
```css
.element {
    -webkit-touch-callout: none;
}
```





## 改变输入框内提示文字颜色
```css
::-webkit-input-placeholder { /* WebKit browsers */
    color: #999; }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #999; }
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999; }
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #999; }
input:focus::-webkit-input-placeholder{ color:#999; }
```





## 如何消除transtration闪屏？
```css
.css {
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}
```





## 对 line-height 是如何理解的？
line-height指的是一行字的高度，包含了字间距，实际上是下一行基线到上一行基线的距离。如果一个标签没有定义height属性，那么其最终表现的高度是由line-height决定的。一个容器没有设置高度，那么撑开容器的高度的是line-height,而不是容器内部的文字内容。把line-height值设置为height一样大小的值可以实现单行文字的垂直居中。line-height和height都能撑开一个高度，height会触发haslayout，而line-height不会。






## 全屏滚动的原理是什么？用到了CSS的哪些属性？
全屏滚动有点类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%。也可以理解为超出隐藏部分，滚动时显示。

可能用到的CSS属： overflow:hidden; transform:translate(100%, 100%); display:none;

❤️拓展 ： 也可以利用全屏视觉滚动差，使用background-attachment: fixed; 来实现全屏效果。（这里是细心的小伙伴提出的另一个idea🤨）