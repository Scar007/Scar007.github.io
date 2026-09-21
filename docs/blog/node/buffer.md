---
publish: false
title: Buffer
createTime: 2021/03/05 00:07:07
permalink: /blog/mwiv8rii/
---
## 新建Buffer会占用V8分配的内存吗?
不会，Buffer属于堆外内存，不是V8分配的。





## Buffer.alloc和Buffer.allocUnsafe的区别?
Buffer.allocUnsafe创建的 Buffer 实例的底层内存是未初始化的。 新创建的 Buffer 的内容是未知的，可能包含敏感数据。 使用 Buffer.alloc() 可以创建以零初始化的 Buffer 实例。





## Buffer的内存分配机制
为了高效的使用申请来的内存，Node采用了slab分配机制。slab是一种动态的内存管理机制。
Node以8kb为界限来来区分Buffer为大对象还是小对象，如果是小于8kb就是小Buffer，大于8kb就是大Buffer。

例如第一次分配一个1024字节的Buffer，Buffer.alloc(1024),那么这次分配就会用到一个slab，接着如果继续Buffer.alloc(1024),那么上一次用的slab的空间还没有用完，因为总共是8kb，1024+1024 = 2048个字节，没有8kb，所以就继续用这个slab给Buffer分配空间。

如果超过8kb，那么直接用C++底层地宫的SlowBuffer来给Buffer对象提供空间。





## Buffer乱码问题
例如一个份文件test.md里的内容如下：
```text
床前明月光，疑是地上霜，举头望明月，低头思故乡
```
我们这样读取就会出现乱码：
```js
var rs = require('fs').createReadStream('test.md', {highWaterMark: 11});
// 床前明???光，疑???地上霜，举头???明月，???头思故乡
```
一般情况下，只需要设置rs.setEncoding('utf8')即可解决乱码问题