---
title: 动画
---
## css动画
### transition：过度动画
- transition-property： 属性
- transition-duration：间隔时间
- transition-timing-function：曲线函数
- transition-delay：延迟
- 常用钩子：transitionend
### animation / keyframes
- animation-name：动画名称，对应@keyframes
- animation-duration：间隔时间
- animation-timing-function：曲线函数
- animation-delay：延迟
- animation-iteration-count：次数
  - infinite：循环动画
- animation-direction：方向
  - alternate：反向播放
- animation-fill-mode：静止模式
  - forwards：停止时，保留最后一帧
  - backwards：停止时，回到第一帧
  - both：同时运用 forwards / backwards
- 常用钩子：animationend
### 动画属性
尽量使用动画属性进行动画，能拥有较好的性能表现
- translate
- scale：缩放
- rotate：旋转
- skew：倾斜
- opacity：透明度
- color：颜色





## CSS3动画比基于脚本的动画有哪些优势？
跟脚本动画相比，使用CSS3动画具有以下优势：
- 易于使用，任何人都可以在不了解javascript的情况下创建它们；
- 即使在合理的系统负载下也能很好的执行。
- 由于简单的动画在javascript中的效果比较差，因此渲染引擎使用跳帧技术来使动画流畅进行；
- 允许浏览器控制动画序列，通过建撒谎哦在当前不可见的选项卡中执行的动画的更新频率来优化性能和效率；






## transform、animation和animation-duration的区别？
Transform: 它和width、left一样，定义了元素很多静态样式实现变形、旋转、缩放、移位及透视等功能，通过一系列功能的组合我们可以实现很炫酷的静态效果（非动画)。

Animation: 作用于元素本身而不是样式属性,属于关键帧动画的范畴，它本身被用来替代一些纯粹表现的javascript代码而实现动画,可以通过keyframe显式控制当前帧的属性值。

animation-duration：规定完成动画所花费的时间，以秒或毫秒计。


[CSS animation 与 CSS transition 有何区别？](https://www.zhihu.com/question/19749045)
[animation、transition、transform的区别](https://juejin.cn/post/6844903785085534215)