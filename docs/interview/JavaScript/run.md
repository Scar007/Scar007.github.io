---
publish: false
title: JS执行
---
## JS执行机制？
javascipt是单线程的描述性脚本语言，与java或C#等编译性语言不同,它不需要进行编译成中间语言,而是由浏览器进行动态地解析与执行。所以，弄懂它的执行机制是很有必要的。

由于javascript是单线程的，为了防止在网页加载过程中由于图片音乐等过大文件而导致加载阻塞，从而衍生出了`同步任务`和`异步任务`。
![avatar](https://static.scar.vip/image/js-run.jpeg)

通过上图可以较为清晰的看到任务执行的流程。
在同步任务和异步任务之外，执行任务的时候还定义了`宏观任务`和`微观任务`两种。一般来说：

宏任务(macro-task)：包括整体代码script，setTimeout，setInterval，I/O， requestAnimationFrame<br>
微任务(micro-task)：Promise系列，process.nextTick(node.js) / Object.observe(该方法已经废弃)；

任务一开始执行的时候，会进入到相应的Event Queue当中。事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

虽然说js是单线程的，但是并不是简单意义上的就是按顺序往下执行。通过以上所讲的这些执行顺序，相信你们应该在心里有个大概的思路了（拖鞋警告二）。看个例子（网上搜的，就得解释的可以就拿过来了）：
```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```
最终输出的顺序是：1，7，6，8，2，4，3，5，9，11，10，12。有没有跟你所预想的一样？如果是，那么恭喜这位童鞋，你已经大致掌握了js的执行机制了。如果不是，那就往下瞅瞅。<br>
第一轮事件循环流程分析如下：
- 整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
- 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1。
- 遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1。
- 遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1。
- 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2。

宏观任务（Event Queue）:setTimeout1, 微观任务（Event Queue）	process1
宏观任务（Event Queue）:setTimeout2, 微观任务（Event Queue）	then1

上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
我们发现了process1和then1两个微任务。

执行process1,输出6。

执行then1，输出8。

第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮时间循环从setTimeout1宏任务开始：

首先输出2。

接下来遇到了process.nextTick()，同样将其分发到微任务Event Queue中，记为process2。new Promise立即执行输出4，then也分发到微任务Event Queue中，记为then2。

宏观任务（Event Queue）setTimeout2， 	微观任务（Event Queue）process2 then2

第二轮事件循环宏任务结束，我们发现有process2和then2两个微任务可以执行。

输出3。

输出5。

第二轮事件循环结束，第二轮输出2，4，3，5。

第三轮事件循环开始，此时只剩setTimeout2了，执行。

直接输出9。

将process.nextTick()分发到微任务Event Queue中。记为process3。

直接执行new Promise，输出11。

将then分发到微任务Event Queue中，记为then3。

宏观任务（Event Queue）无，微观任务（Event Queue）process3 then3

第三轮事件循环宏任务执行结束，执行两个微任务process3和then3。

输出10。

输出12。

第三轮事件循环结束，第三轮输出9，11，10，12。

最终整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。

(需要注意的是，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)
最后补充一点，谨记javascript是一门单线程语言，而Event Loop是javascript的执行机制。






## js延迟加载的方式有哪些？
- defer属性（页面load后执行）：脚本会被延迟到整个页面都解析完毕之后再执行。若是设置了defer属性，就等于告诉浏览器立即下载，但是会延迟执行。注意defer属性只适用于外部脚本文件。
- async 属性（页面load前执行）：为了不让页面等待脚本下载和执行，异步加载页面和其他内容。async同样也只适用于外部文件（不会影响页面加载，但是不能控制加载的顺序）。
- 动态创建DOM方式；
- 使用jQuery的getScript()方法；
- 使用setTimeout延迟方法；
- 让js文件最后加载。






## 运行环境
