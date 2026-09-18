---
title: 其他
---
## 数据树
二叉树：最多只有两个子节点
- 完全二叉树
- 满二叉树
  - 深度为h，有n个节点，且满足n=2^h - 1

二叉查找树：是一种特殊的二叉树，能有效地提高查找效率
- 小值在左，大值在右
- 节点n的所有左子树值小于n，所有右子树值大于n





## js求平面两点之间的距离
```js
// 数据可以以数组方式存储，也可以是对象方式
let a = {x:'6', y:10},
  b = {x: 8, y: 20};
function distant(a,b){
  let dx = Number(a.x) - Number(b.x)
  let dy = Number(a.y) - Number(b.y)
  return Math.pow(dx*dx + dy*dy, .5)
}
```




## 如何将浮点数点左边的数每三位添加一个逗号，如12000000.11转化为『12,000,000.11』?
```js
function commafy(num){
  return num && num
   .toString()
   .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
     return $2 + ',';
   });
}
```





## 递归运用(斐波那契数列)：爬楼梯问题
初始在第一级，到第一级有1种方法(s(1) = 1)，到第二级也只有一种方法(s(2) = 1)，第三级(s(3) = s(1) = s(2))
```js
function cStairs(n) {
  if (n === 1 || n === 2) {
    return 1;
  } else {
    return cStairs(n - 1) + cStaris(n - 2);
  }
}
```





## 天平找次品
有n个硬币，其中1个为假币，假币重量较轻，你有一把天平，请问，至少需要称多少次能保证一定找到假币？<br>

三等分算法：
- 将硬币分成3组，随便取其中两组天平称量
- 平衡，假币在未上称的一组，取其回到1继续循环
- 不平衡，假币在天平上较轻的一组，取其回到1继续循环






## 编写一个方法 求一个字符串的字节长度
```js
function GetBytes(str){

        var len = str.length;

        var bytes = len;

        for(var i=0; i<len; i++){

            if (str.charCodeAt(i) > 255) bytes++;

        }

        return bytes;

    }

alert(GetBytes("你好,as"));
```



[前端算法渣的救赎之路](https://juejin.cn/post/6844904175562653710)
[算法套路](https://mp.weixin.qq.com/s/bV6bSB4ki_ezFCvGC5uHxA)