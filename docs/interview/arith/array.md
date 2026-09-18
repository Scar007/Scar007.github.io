---
publish: false
title: 数组篇
---
[数组知识总结](https://www.scar.vip/%e5%89%8d%e7%ab%af/%e6%95%b0%e7%bb%84%e7%9f%a5%e8%af%86%e6%80%bb%e7%bb%93/)

## 数组乱序
```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
  return Math.random() - 0.5;
});
```





## 数组拆解
```js
Array.prototype.flat = function() {
  return this.toString().split(',').map(item => +item )
}
```



## 合并两个有序数组
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n ）来保存 nums2 中的元素。

示例:
```JavaScript
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```
[leetcode地址](https://leetcode-cn.com/problems/merge-sorted-array/solution/tu-jie-he-bing-liang-ge-you-xu-shu-zu-by-user7746o/)

#### 思想一
好暴力
```JavaScript
function twoNumConcat(num1, num2) {
  if (!(num1 instanceof Array)) {
    num1 = []
  }

  if (!(num2 instanceof Array)) {
    num2 = []
  }

  return num1.concat(num2).filter(item => item).sort((a, b) => a - b);
}

console.log(twoNumConcat([1, 2, 3, 0, 0, 0], [0, 2, 2, 4, 5]));
```

#### 思想二
- nums1 、 nums2 有序，若把 nums2 全部合并到 nums1 ，则合并后的 nums1 长度为 m+n
- 我们可以从下标 m+n-1 的位置填充 nums1 ，比较 nums1[len1] 与 nums2[len2] 的大小，将最大值写入 nums1[len]，即
    - nums1[len1]>=nums2[len2] ，nums1[len--] = nums1[len1--] ,这里 -- 是因为写入成功后，下标自动建议，继续往前比较
    - 否则 nums1[len--] = nums2[len2--]
- 边界条件：
    - 若 len1 < 0 ，即 len2 >= 0 ，此时 nums1 已重写入， nums2 还未合并完，仅仅需要将 nums2 的剩余元素（0…len）写入 nums2 即可，写入后，合并完成
    - 若 len2 < 0，此时 nums2 已全部合并到 nums1 ，合并完成

时间复杂度为 O(m+n)

```JavaScript
const merge = function(nums1, m, nums2, n) {
    let len1 = m - 1,
        len2 = n - 1,
        len = m + n - 1
    while(len2 >= 0) {
        if(len1 < 0) {
            nums1[len--] = nums2[len2--]
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--]: nums2[len2--]
    }
};
```

#### 思想三
```JavaScript
function mergeAry(left = [], right = []) {
  const result = [];
  while (left.length && right.length) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return result.concat(left, right);
}
```

#### 思想四
双指针法
```JavaScript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  var p = nums1.length - 1, p1=m-1, p2=n-1
  while(p1 >=0 && p2 >=0){
    if(nums2[p2] > nums1[p1]){
      nums1[p]=nums2[p2]
      p2--;
      p--;
    }else{
      nums1[p]=nums1[p1]
      p1--
      p--
    }
  }
  while(p2>=0){// nums1指针没到头但是num2指针到头，不影响,nums2指针没到头要添加到nums1上
    nums1[p]=nums2[p2]
    p2--
    p--
  }
};
```

#### 思想五
```JavaScript
var merge = function(nums1, m, nums2, n) { for(let i = 0; i< n; i++){ nums1[i+m] = nums2[i] } nums1.sort((a,b)=>a -b) };
```

#### 思想六
```JavaScript
let num2 = [1, 2, 3, 4, 5]
let num1 = [2, 7, 8, 10]
let len1 = num1.length - 1
let len2 = num2.length - 1
let len =  num1.length+ num2.length - 1
function mergeArray(num1, num2, len1, len2, len) {
  while (len1 >= 0 && len2 >= 0) {
    num1[len--] = num1[len1] <= num2[len2] ? num2[len2--] : num1[len1--]
  }

  if (len1 >= 0) return num1 // len1 有值， 说明num2 已经全部merge 到 num1

  // len2 有值， 说明num1 已经到头了
  // 且num1[0] 的值比 num2剩下的最大的值还大， 所以把 num2 剩下的值放在num1的最前面就可以了
  if (len2 >= 0) {
    while (len2 > -1) {
      num1[len--] = num2[len2--]
    }
  }
  return num1
}
```

- [原文地址](https://github.com/sisterAn/JavaScript-Algorithms/issues/3)





## 获取数组的最大值(ES5, ES6)
#### ES5
```js
Math.max.apply(null, [15, 3, 67, 19])
```
#### ES6
```js
Math.max(...[15, 3, 67, 19])
```
#### reduce
```js
[15, 3, 67, 19].reduce(max, current) => {
  return max = max > current ? max : current;
}
```





## 数组去重
```js
// indexOf实现
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

console.log(unique(array));

// 排序后去重
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

console.log(unique(array));

// filter实现
var array = [1, 2, 1, 1, '1'];
function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}
console.log(unique(array));

// 排序去重
var array = [1, 2, 1, 1, '1'];
function unique(array) {
    return array.concat().sort().filter(function(item, index, array){
        return !index || item !== array[index - 1]
    })
}
console.log(unique(array));

// Object键值对
var array = [{value: 1}, {value: 1}, {value: 2}];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

console.log(unique(array)); // [{value: 1}, {value: 2}]

// ES6 Set实现
var unique = (a) => [...new Set(a)]
```






## 按照数组每一项的十分位排序
```js
function fn11 (arr) {
    let list = [...arr]
    let temp = []
    while (list.length > 0) {
        let min = list[0]
        let minIndex = 0
        let length = list.length
        for(let i = 1; i < length; i++) {
            let item = String(list[i])
            let len = item.length
            let _min = String(min)
            let _minLen = _min.length
            if (item[len - 2] < _min[_minLen - 2]) {
                min = list[i]
                minIndex = i
            } else if (item[len - 2] === _min[_minLen - 2]) {
                if (list[i] < min) {
                    min = list[i]
                    minIndex = i
                }
            }
        }
        temp.push(min)
        list.splice(minIndex, 1)
    }
    return temp
}
```





## 将数组扁平化
如：[1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]
#### 递归处理
```js
var arr = [1, [2, [ [3, 4], 5], 6]];

function check(arr){
  var result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(check(item))
    } else {
      result.push(item)
    }
  })
  return result;
};
console.log(check(arr)); // [ 1, 2, 3, 4, 5, 6 ]
```
#### ES6 flat
flat(depth)中的depth是代表嵌套数组的深度，也就是几维数组的几，默认是1。<br>
使用的时候我们可以填具体的数组维度，也可以不用知道数组未读直接填Infinity
```js
var arr = [1, [2, [ [3, 4], 5], 6]];
var result = arr.flat(Infinity);
console.log(result); // [ 1, 2, 3, 4, 5, 6 ]
```
#### toString()
利用数组的方法：toString(), split(), join(), map等实现
```js
var arr = [1, [2, [ [3, 4], 5], 6]];
function check(arr) {
  return arr.toString().split(',').map(item => Number(item))
}
console.log(check(arr)); // [ 1, 2, 3, 4, 5, 6 ]
```
```js
var arr = [1, [2, [ [3, 4], 5], 6]];
function check(arr) {
  return arr.join().split(',').map(item => Number(item))
}
console.log(check(arr)); // [ 1, 2, 3, 4, 5, 6 ]
```
#### reduce()
```js
var arr = [1, [2, [ [3, 4], 5], 6]];
function check(arr) {
  return arr.reduce((item1, item2) => {
    return item1.concat(Array.isArray(item2) ? check(item2) : item2);
  }, [])
}
console.log(check(arr)); // [ 1, 2, 3, 4, 5, 6 ]
```
reduce()接收两个参数：第一个参数是处理扁平化的函数；第二个参数是[]，作为遍历的开始。







## 合并两个有序数组
```js
```



## 求两数之和为