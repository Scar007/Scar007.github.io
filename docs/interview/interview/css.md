---
publish: false
---

## CSS
- 居中布局<br>
[居中布局(垂直、水平、垂直水平)](https://interview.scar.vip/css/layout.html#%E5%AE%9E%E7%8E%B0%E5%B1%85%E4%B8%AD%E5%B8%83%E5%B1%80)

- 重绘、回流(重排)<br>
  [重排(reflow)和重绘(repaint)](https://juejin.cn/post/6844904083212468238)

- 1px问题<br>
  [最后一次探究 1px](https://jelly.jd.com/article/5f5a4b31da524a0147e97da0)<br>
  [如何解决一像素问题](https://interview.scar.vip/css/other.html#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E4%B8%80%E5%83%8F%E7%B4%A0%E9%97%AE%E9%A2%98)

- 两边定宽，中间自适应<br>
  [CSS || 三栏布局，两边固定，中间自适应](https://segmentfault.com/a/1190000008705541)

- flex布局及配套属性
  [阮一峰Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
  - flex-shrink
    > 阮一峰flex教程4.3
  - flex 布局，横向布局，父盒子宽100，三个子盒子设置宽50，将怎么展示<br>
  答：在父盒子中横向平分挤满，因为flex-wrap默认属性为nowrap，默认不折行
- 双飞翼布局、圣杯布局<br>
  [圣杯布局和双飞翼布局](https://interview.scar.vip/css/layout.html#%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80%E5%92%8C%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80)

- CSS in JS<br>
  [css 命名：BEM, scoped css, css modules 与 css-in-js](https://juejin.cn/post/6844903748926439431)<br>
  [ Atomic CSS-in-js](https://juejin.cn/post/6844904152548507661)

- BEM class 命名规范<br>
  [CSS — BEM 命名规范](https://juejin.cn/post/6844903672162304013)

- 伪类和伪元素<br>
  [伪类和伪元素2014](https://segmentfault.com/a/1190000000484493)<br>
  [伪类和伪元素2019](https://juejin.cn/post/6844903810951806989)

- rem原理<br>
  [Rem布局的原理解析](https://yanhaijing.com/css/2017/09/29/principle-of-rem-layout/)

- DPR是什么<br>
  [移动web开发之像素和DPR](https://www.cnblogs.com/xiaohuochai/p/5494624.html)

- webp、jpg、png、gif 之间的区别，如何做选择？<br>
  [GIF/PNG/JPG和WEBP/base64/apng图片优点和缺点整理](https://cloud.tencent.com/developer/article/1090849)
  - 检查浏览器是否支持webp
    ```js
    document
      .createElement("canvas")
      .toDataURL("image/webp")
      .indexOf("data:image/webp") === 0
    ```
    [判断浏览器是否支持 webp 的几种解决方法](https://juejin.cn/post/6844903858028675079)

- css权重，权重一样作何选择<br>
  [一次弄懂CSS选择器权重问题](https://zhuanlan.zhihu.com/p/125536847)

- div 宽度⾃适应，宽⾼保持等比例缩放<br>
  [css实现div宽度自适应，宽高保持等比缩放](https://blog.csdn.net/qq_41880073/article/details/115300190)

- 移动端适配方案<br>
  [前端响应式布局原理与方案（详细版）](https://juejin.cn/post/6844903814332432397)

- zoom和scale有何区别？<br>
  [zoom和transform:scale的区别](https://www.zhangxinxu.com/wordpress/2015/11/zoom-transform-scale-diff/)

