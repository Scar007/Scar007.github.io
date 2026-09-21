---
publish: false
title: 线程与进程
createTime: 2021/03/07 03:30:10
permalink: /blog/eq3k70ya/
---
## 请简述一下node的多进程架构?
面对node单线程对多核CPU使用不足的情况，Node提供了child_process模块，来实现进程的复制，node的多进程架构是主从模式，如下所示：
![avatar](https://static.scar.vip/image/node-progress.png)
```js
var fork = require('child_process').fork;
var cpus = require('os').cpus();
for(var i = 0; i < cpus.length; i++){
  fork('./worker.js');
}
```
这就是著名的主从模式，Master-Worker






## 请问创建子进程的方法有哪些?简单说一下它们的区别。
创建子进程的方法大致有:
- spawn()： 启动一个子进程来执行命令
- exec(): 启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况
- execFlie(): 启动一个子进程来执行可执行文件
- fork(): 与spawn()类似，不同电在于它创建Node子进程需要执行js文件
- spawn()与exec()、execFile()不同的是，后两者创建时可以指定timeout属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死
- exec()与execFile()不同的是，exec()适合执行已有命令，execFile()适合执行文件。






## 请问你知道spawn在创建子进程的时候，第三个参数有一个stdio选项吗，这个选项的作用是什么，默认的值是什么？
- 选项用于配置在父进程和子进程之间建立的管道。
- 默认情况下，子进程的 stdin、 stdout 和 stderr 会被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。
- 这相当于将 options.stdio 设置为 ['pipe', 'pipe', 'pipe']。






## 请问实现一个node子进程被杀死，然后自动重启代码的思路？
在创建子进程的时候就让子进程监听exit事件，如果被杀死就重新fork一下
```js
var createWorker = function(){
    var worker = fork(__dirname + 'worker.js')
    worker.on('exit', function(){
        console.log('Worker' + worker.pid + 'exited');
        // 如果退出就创建新的worker
        createWorker()
    })
}
```




## 在上题的基础上，实现限量重启，比如我最多让其在1分钟内重启5次，超过了就报警给运维
- 思路大概是在创建worker的时候，就判断创建的这个worker是否在1分钟内重启次数超过5次
- 所以每一次创建worker的时候都要记录这个worker 创建时间，放入一个数组队列里面，每次创建worker都去取队列里前5条记录
- 如果这5条记录的时间间隔小于1分钟，就说明到了报警的时候了





## 如何实现进程间的状态共享，或者数据共享





## 线程与进程的区别？
一个程序至少有一个进程，一个进程至少有一个线程。线程的划分尺度小于进程，使得多线程程序的并发性高。这里我们可以简单的把进程理解成火车，线程理解为车厢。

区别：
- 线程在进程下运行，不能单独运行（单纯的一节节车厢无法运行）；
- 一个进程可以包含多个线程（一辆火车有很多车厢）；
- 不同进程之间的数据难以共享（列车在行驶时，乘客很难从一列火车换到另一列火车）；
- 同一进程下的线程数据共享便捷（乘客在同一列火车上从一节车厢换到另一节很方便）；
- 进程要比线程花费更多的计算机资源（车厢仅仅是跑，或者还要发动动力带它跑，花的力气更多）；
- 进程之间互不影响，但是同一个进程中要是有一个线程出现问题将导致整个进程有问题（一辆类车要是某一节车厢出问题比如起火，会导致火-车暂停）；
- 进程可以拓展到多机，而线程最多扩展到多核cpu。（不同的火车可以开在不同的轨道上，而同一火车的车厢只能形式在当前火车行驶的轨道上）；
- 进程使用的内存地址可以上锁，即一个线程使用某些共享内存时，其他线程必须等它结束才能使用这块内存。（例如使用火车上的洗手间-- “互斥锁”）；
- 进程使用的内存地址可以限定使用量（例如火车上的卧铺，最多只允许多少个人睡，如果安排满了就需要等待，待有空床位出来了才能进去--“信号量”）；






## 宏任务和微任务
宏任务： 当前调用栈中执行的任务称为宏任务。包括整体代码script，setTimeout，setInterval；

微任务： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务。包含回调事件，Promise，process.nextTick(node.js)；

> 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。






## Web Worker
现代浏览器为JavaScript创造的多线程环境。可以新建并将部分任务分配到worker线程并行运行，两个线程可独立运行，互不干扰，可通过自带的消息机制互相通信。

基本用法：
```js
// 创建worker
const worker = new Worker('work.js');

// 向worker线程推送消息
worker.postMessage('Hello World');

// 监听worker线程发送过来的消息
worker.onmessage = function(event) {
  console.log('Received message' + event.data);
}
```
限制：
- 同源限制
- 无法使用document、window、alert、confirm
- 无法加载本地资源

