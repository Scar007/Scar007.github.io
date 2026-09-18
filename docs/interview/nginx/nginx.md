---
publish: false
title: Nginx
---
## nginx概念
- Nginx是由俄罗斯的程序设计师lgor Sysoev所开发一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP代理服务器；
- 它是一款轻量级的Web服务器/反向代理服务器以及电子邮件代理服务器，并在一个BSD-like协议下发行；
- 其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好；
- 它相较于Apache\lighttpd具有占有内存少，稳定性高等优势，并且依靠并发能力强，丰富的模块库以及友好灵活的配置而闻名；
- 在Linux操作系统下，nginx使用epoll事件模型,得益于此，nginx在Linux操作系统下效率相当高。同时Nginx在OpenBSD或FreeBSD操作系统上采用类似于Epoll的高效事件模型kqueue；
- 它作为负载均衡服务：Nginx 既可以在内部直接支持 Rails和 PHP 程序对外进行服务，也可以支持作为 HTTP代理服务对外进行服务。 Nginx采用C进行编写，不论是系统资源开销还是CPU使用效率都比 Perlbal 要好很多；
- 反向代理，负载均衡。当网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群可以使用nginx做反向代理。并且多台服务器可以平均分担负载，不会因为某台服务器负载高宕机而某台服务器闲置的情况。





## nginx的应用场景
- 应用于虚拟主机，可以实现在一台服务器虚拟出多个网站。
- 应用于http服务器，Nginx是一个http服务可以独立提供http服务。可以做网页静态服务器。
- 反向代理，负载均衡。当某一网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群，可以使用nginx做反向代理。多台服务器可以平均分担负载，不会因为某台服务器负载高宕机而某台服务器闲置的情况。







## NGINX的作⽤
[nginx有哪些作用？](https://zhuanlan.zhihu.com/p/54793789)
[8分钟带你深入浅出搞懂Nginx](https://zhuanlan.zhihu.com/p/34943332)
[简单了解nginx的作用](https://my.oschina.net/xiaoyoung/blog/3015426)






## ，负载均衡有什么策略
[常用负载均衡策略分析](https://www.jianshu.com/p/d7e173d212a8)
[负载均衡策略](https://zhuanlan.zhihu.com/p/69739253)
[常见负载均衡策略](https://www.huaweicloud.com/articles/4d1424d3e3cf0fb904efe3977dd7a48c.html)





## 什么是反向代理？
[反向代理为何叫反向代理？](https://www.zhihu.com/question/24723688)
[正向代理与反向代理【总结】](https://www.cnblogs.com/anker/p/6056540.html)
[理解 http 反向代理](https://my.oschina.net/goldenshaw/blog/4685389)

