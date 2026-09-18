---
title: 实现findIndex
---

### 找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，比如7第一次出现的位置是4

### 二分查找法
```JavaScript
 function findIndex(arr, target){
        const len = arr.length;
        let left = 0;
        let right = len - 1;

        let ret = -1;
        while (left <= right) {
            const middle = ((right - left) >> 1) + left;
            const val = arr[middle];
            if (val >= target) {
                if (val === target) {
                    ret = middle;
                }
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }

        return ret;
    }
```
##### 在排序数组中查找元素的第一个和最后一个位置
给定一个按照升序排列的整数数组 nums ，和一个目标值 target 。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(logn) 级别。

如果数组中不存在目标值，返回 [-1, -1] 。

示例 1:
```JavaScript
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```
示例 2：
```JavaScript
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```
### 思想一
```JavaScript
var searchRange = function(nums, target) {
  let left = 0, right = nums.length -1
  let start = -1, end = -1
  while(left <= right) {
      if(nums[left] < target) left++
      // 找到第一个出现的位置，赋值给start
      if(nums[left] === target && start === -1) start = left++
      if(nums[right] > target) right--
      // 找到最后一个出现的位置，赋值给end
      if(nums[right] === target && end === -1) end = right--
      if(start > -1 && end > -1) break
  }
  return [start, end]
};
```
### 思想二
```JavaScript
let searchRange = function(nums, target) {
    return [leftSearch(nums, target), rightSearch(nums, target)]
}

let leftSearch = function(nums, target) {
    let low = 0, 
        high = nums.length - 1,
        mid
    while (low <= high) {
        mid = Math.floor((low+high)/2)
        if (nums[mid] < target) {
            low = mid + 1
        } else if (nums[mid] > target) {
            high = mid - 1
        } else if (nums[mid] === target) {
            // 这里不返回，继续收缩左侧边界
            high = mid - 1
        }
    }
    // 最后检查 low 是否越界或命中
    if (low >= nums.length || nums[low] != target)
        return -1
    return low
}


let rightSearch = function (nums, target) {
    let low = 0, 
        high = nums.length - 1,
        mid
    while (low <= high) {
        mid = Math.floor((low+high)/2)
        if (nums[mid] < target) {
            low = mid + 1
        } else if (nums[mid] > target) {
            high = mid - 1
        } else if (nums[mid] === target) {
            // 这里不返回，继续收缩右侧边界
            low = mid + 1
        }
    }
    // 最后检查 high 是否越界或命中
    if (high < 0 || nums[high] != target)
        return -1
    return high
}
```
复杂度分析：
- 时间复杂度：O(logn) 
- 空间复杂度：O(1)


- [leetcode题目地址](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [在排序数组中查找元素的第一个和最后一个位置](https://github.com/sisterAn/JavaScript-Algorithms/issues/84)

