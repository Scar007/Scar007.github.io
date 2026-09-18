---
title: DOM相关
---
[DOM基础及深入](https://www.scar.vip/%e5%89%8d%e7%ab%af/dom%e5%9f%ba%e7%a1%80%e5%8f%8a%e6%b7%b1%e5%85%a5/)
## DOM 事件模型是如何的,编写一个 EventUtil 工具类实现事件管理兼容
- DOM 事件包含捕获（capture）和冒泡（bubble）两个阶段：捕获阶段事件从 window 开始触发事件然后通过祖先节点一次传递到触发事件的 DOM 元素上；冒泡阶段事件从初始元素依次向祖先节点传递直到 window
- 标准事件监听 elem.addEventListener(type, handler, capture)/elem.removeEventListener(type, handler, capture)：handler 接收保存事件信息的 event 对象作为参数，event.target 为触发事件的对象，handler 调用上下文 this 为绑定监听器的对象，event.preventDefault()取消事件默认行为，event.stopPropagation()/event.stopImmediatePropagation()取消事件传递
- 老版本 IE 事件监听 elem.attachEvent('on'+type, handler)/elem.detachEvent('on'+type, handler)：handler 不接收 event 作为参数，事件信息保存在 window.event 中，触发事件的对象为 event.srcElement，handler 执行上下文 this 为 window 使用闭包中调用 handler.call(elem, event)可模仿标准模型，然后返回闭包，保证了监听器的移除。event.returnValue 为 false 时取消事件默认行为，event.cancleBubble 为 true 时取消时间传播
- 通常利用事件冒泡机制托管事件处理程序提高程序性能。
```js
/**
 * 跨浏览器事件处理工具。只支持冒泡。不支持捕获
 * @author  (qiu_deqing@126.com)
 */

var EventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // 返回注册成功的监听器，IE中需要使用返回值来移除监听器
    on: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
            return handler;
        } else if (elem.attachEvent) {
            var wrapper = function () {
              var event = window.event;
              event.target = event.srcElement;
              handler.call(elem, event);
            };
            elem.attachEvent('on' + type, wrapper);
            return wrapper;
        }
    },
    off: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else if ('returnValue' in event) {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else if ('cancelBubble' in event) {
            event.cancelBubble = true;
        }
    },
    /**
     * keypress事件跨浏览器获取输入字符
     * 某些浏览器在一些特殊键上也触发keypress，此时返回null
     **/
     getChar: function (event) {
        if (event.which == null) {
            return String.fromCharCode(event.keyCode);  // IE
        }
        else if (event.which != 0 && event.charCode != 0) {
            return String.fromCharCode(event.which);    // the rest
        }
        else {
            return null;    // special key
        }
     }
};
```





## DOM 元素 e 的 e.getAttribute(propName)和 e.propName 有什么区别和联系
- e.getAttribute()，是标准 DOM 操作文档元素属性的方法，具有通用性可在任意文档上使用，返回元素在源文件中设置的属性
- e.propName 通常是在 HTML 文档中访问特定元素的特性，浏览器解析元素后生成对应对象（如 a 标签生成 HTMLAnchorElement），这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用 getAttribute 进行访问
- e.getAttribute()返回值是源文件中设置的值，类型是字符串或者 null（有的实现返回""）
- e.propName 返回值可能是字符串、布尔值、对象、undefined 等
- 大部分 attribute 与 property 是一一对应关系，修改其中一个会影响另一个，如 id，title 等属性
- 一些布尔属性\<input hidden/>的检测设置需要 hasAttribute 和 removeAttribute 来完成，或者设置对应 property
- 像\<a href="../index.html">link`</a>`中 href 属性，转换成 property 的时候需要通过转换得到完整 URL
- 一些 attribute 和 property 不是一一对应如：form 控件中\<input value="hello"/>对应的是 defaultValue，修改或设置 value property 修改的是控件当前值，setAttribute 修改 value 属性不会改变 value property






## DOM操作——怎样添加、移除、移动、复制、创建和查找节点?
#### 创建:
- createDocumentFragment()    //创建一个DOM片段
- createElement()   //创建一个具体的元素
- createTextNode()   //创建一个文本节点
#### 添加:
- appendChild()
#### 移除:
- removeChild()
#### 替换:
- replaceChild()
#### 插入:
- insertBefore() //在已有的子节点前插入一个新的子节点
#### 查找:
- getElementsByTagName()    //通过标签名称
- getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
- getElementById()    //通过元素Id，唯一性






## DOM和BOM是什么?
首先我们需要知道：javascript是由ECMAScript，DOM，BOM三部分构成的。
- <strong>ECMAScript</strong>是一种语言，是对规定的语法，操作，关键字，语句的一个描述，javascript实现了ECMAScript;
- <strong>DOM</strong>是文档对象模型，包括了获取元素，修改样式以及操作元素等三方面的内容，也是通常我们用的最多的操作，其提供了很多兼容性的写法；
- <strong>BOM</strong>是浏览器对象模型，包括浏览器的一些操作，window.onload, window.open等还有浏览器时间，监听窗口的改变onresize，监听滚动事件onscroll等；






## 在JavaScript中使用innerHTML的缺点是什么?
- 内容随处可见；
- 不能像‘追加到innerHTML’一样使用；
- 即使使用+=like "innerHTML = innerHTML + 'html'"，旧的内容仍然会被html替换；
- 整个innerHTML内容被重新解析并构建成元素，因此它的速度会慢很多；
- innerHTML不提供验证，因此可能会在文档中插入有效的和破坏性的HTML并将其中断；






## DOM节点有几种类型？
一般情况下，节点至少拥有nodeType（节点类型）、nodeName（节点名称）和nodeValue（节点值）。

nodeType属性返回节点类型的常数值。不同的类型对应不同的常数值，12种类型分别对应1到12的常数值，如下：

节点类型         | 常数值  | \
----------------|--------|------
元素节点         |   1    | Node.ELEMENT_NODE
属性节点         |   2    | Node.ATTRIBUTE_NODE
文本节点         |   3    | Node.TEXT_NODE
CDATA节点        |   4    | Node.CDATA_SECTION_NODE
实体引用名称节点   |   5    | Node.ENTRY_REFERENCE_NODE
实体名称节点      |   6    | Node.ENTITY_NODE
处理指令节点      |   7    | Node.PROCESSING_INSTRUCTION_NODE
注释节点         |   8    | Node.COMMENT_NODE
文档节点         |   9    | Node.DOCUMENT_NODE
文档类型节点      |   10   | Node.DOCUMENT_TYPE_NODE
文档片段节点      |   11   | Node.DOCUMENT_FRAGMENT_NODE
DTD声明节点       |   12   | Node.NOTATION_NODE






## documen.write和 innerHTML的区别？
document.write只能重绘整个页面

innerHTML可以重绘页面的一部分