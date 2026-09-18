---
publish: false
title: 移动事件
---
## mouseover/mouseout 与 mouseenter/mouseleave 的区别与联系?
1. mouseover/mouseout 是标准事件，所有浏览器都支持；mouseenter/mouseleave 是 IE5.5 引入的特有事件后来被 DOM3 标准采纳，现代标准浏览器也支持
2. mouseover/mouseout 是冒泡事件；mouseenter/mouseleave不冒泡。需要为多个元素监听鼠标移入/出事件时，推荐 mouseover/mouseout 托管，提高性能
3. 标准事件模型中 event.target 表示发生移入/出的元素,event.relatedTarget对应移出/如元素；在老 IE 中 event.srcElement 表示发生移入/出的元素，event.toElement表示移出的目标元素，event.fromElement表示移入时的来源元素

栗子：鼠标从 div#target 元素移出时进行处理，判断逻辑如下：
```js
<div id="target"><span>test</span></div>

<script type="text/javascript">
var target = document.getElementById('target');
if (target.addEventListener) {
  target.addEventListener('mouseout', mouseoutHandler, false);
} else if (target.attachEvent) {
  target.attachEvent('onmouseout', mouseoutHandler);
}

function mouseoutHandler(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  // 判断移出鼠标的元素是否为目标元素
  if (target.id !== 'target') {
    return;
  }

  // 判断鼠标是移出元素还是移到子元素
  var relatedTarget = event.relatedTarget || e.toElement;
  while (relatedTarget !== target
    && relatedTarget.nodeName.toUpperCase() !== 'BODY') {
    relatedTarget = relatedTarget.parentNode;
  }

  // 如果相等，说明鼠标在元素内部移动
  if (relatedTarget === target) {
    return;
  }

  // 执行需要操作
  //alert('鼠标移出');

}
</script>
```