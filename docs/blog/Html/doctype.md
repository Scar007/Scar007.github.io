---
publish: false
title: Doctype
createTime: 2021/03/06 16:57:29
permalink: /blog/02j3qjhj/
---
## doctype 是什么，如何区分严格模式与混杂模式，分别有何意义，举例常见 doctype 及特点?
### doctype：
1. \<!doctype>声明必须处于 HTML 文档的头部，在\<html>标签之前，HTML5 中不区分大小写
2. \<!doctype>声明不是一个 HTML 标签，是一个用于告诉浏览器当前 HTML 版本的指令
3. 现代浏览器的 html 布局引擎通过检查 doctype 决定使用兼容模式还是标准模式对文档进行渲染，一些浏览器有一个接近标准模型。
4. 在 HTML4.01 中<!doctype>声明指向一个 DTD，由于 HTML4.01 基于 SGML，所以 DTD 指定了标记规则以保证浏览器正确渲染内容
5. HTML5 不基于 SGML，所以不用指定 DTD
### 严格模式与混杂模式区分：
- 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行
- 在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。 DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现
### 常见 dotype：
1. HTML4.01 strict：不允许使用表现性、废弃元素（如 font）以及 frameset。声明：
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```
2. HTML4.01 Transitional:允许使用表现性、废弃元素（如 font），不允许使用 frameset。声明：
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```
3. HTML4.01 Frameset:允许表现性元素，废气元素以及 frameset。声明：
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```
4. XHTML1.0 Strict:不使用允许表现性、废弃元素以及 frameset。文档必须是结构良好的 XML 文档。声明：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```
5. XHTML1.0 Transitional:允许使用表现性、废弃元素，不允许 frameset，文档必须是结构良好的 XMl 文档。声明：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```
6. XHTML 1.0 Frameset:允许使用表现性、废弃元素以及 frameset，文档必须是结构良好的 XML 文档。声明：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```
7. HTML 5:
```html
<!doctype html>
```