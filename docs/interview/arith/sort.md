---
title: 排序
---

## 冒泡排序
冒泡排序，是交换排序中最简单的排序方法，其主要思想是：在待排序序列中选两相邻记录的数字，如果反序则交换，直到没有反序的数列为止。
![avatar](https://static.scar.vip/interview-vuepress/image/bobble-sort.jpg)
#### 算法描述：
- 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
- 针对所有的元素重复以上的步骤，除了最后一个；
- 重复步骤1~3，直到排序完成。
##### 代码实现：

```js
function bubbleSort(arr) {
    var len = arr.length;
    for(var i = 0;i < len;i++) {
        for(var j = 0;j < len-1-i;j++) {
            if(arr[j] > arr[j+1]) {// 相邻元素两两比较
                var temp = arr[j+1];// 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```


## 快速排序
快速排序，是对冒泡排序的一种改进。在快速排序中，记录的比较和移动的是从两端向中间进行，数值大的记录一次就能从前面移动到后面，数值小的记录一次就能从后面移动到前面，从而减少了总的比较次数和移动次数。
![avatar](https://scar-bucket-1300642092.file.myqcloud.com/interview-vuepress/image/quick-sort.gif)
<strong>算法描述：</strong>
快速排序使用分治法把一个数列（list）分为2个数列（sub-lists），具体算法如下：
- 从数列中挑出一个元素，称为 “基准”（pivot）；
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

#### 代码实现：

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let centerIndex = Math.floor(arr.length / 2);
  let center = arr.splice(centerIndex, 1)[0];
  let left = []
  let right = []
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] < center) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(center, quickSort(right))
}
```


## 插入排序
插入排序，是一类借助“插入”进行排序的方法，其主要思想是：每次将一个待排序的数字按其关键码的大小插入到一个已排好的有序序列中，直到全部数字排好序。
![avatar](https://static.scar.vip/interview-vuepress/image/insertion-sort.gif)
#### 算法描述：

- 插入排序采用in-place在数组上实现，具体算法描述如下：
- 从第一个元素开始，该元素可以认为已经被排序；
- 取出下一个元素，在已经排序的元素序列中从后向前扫描；
- 如果该元素（已排序）大于新元素，将该元素移到下一位置；
- 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
- 将新元素插入到该位置后；
- 重复步骤2~5。

#### 代码实现：

```js
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;// 从后向前扫描索引，当前元素数值
    for(var i = 1;i<len;i++) {
        preIndex = i-1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}
```


## 希尔排序
希尔排序，是对插入排序的一种改进，其排序的基本思想：先将整个待排序序列分割成若干个子序列，在子序列分别进行直接插入排序，待整个序列基本有序时，再对整体序列进行一次插入排序。
![avatar](https://scar-bucket-1300642092.cos.ap-beijing.myqcloud.com/interview-vuepress/image/shell-sort.gif)
#### 算法描述：
- 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
- 按增量序列个数k，对序列进行k 趟排序；
- 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

#### 代码实现：

```js
function SellSort(arr) {
    var len = arr.length;
    for(var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 多个分组交替执行
        for(var i = gap; i < len;i++) {
            var j = i;
            var current = arr[i];
            while (j - gap >= 0 && current < arr[j - gap]) {
                 arr[j] = arr[j - gap];
                 j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}
```



## 选择排序
选择排序，是一种简单直观的排序算法，其基本思想是：首先在待排序序列中选出最小值，存放在排序序列起始位置，然后再从剩余未排序元素中继续寻找最小元素，放到已排序序列末尾。以此类推，直到所有元素均排序完毕。

![avatar](https://scar-bucket-1300642092.file.myqcloud.com/interview-vuepress/image/select-sort.gif)
#### 算法描述：
n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：

- 初始状态：无序区为R[1..n]，有序区为空；
- 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
- n-1趟结束，数组有序化了。

#### 代码实现：

```js
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for(var i = 0; i< len-1;i++){
        minIndex = i;
        for(var j = i+1;j<len;j++) {
            if(arr[j] < arr[minIndex]) {// 寻找最小的数
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```



## 堆排序
堆排序，是利用堆数据结构设计的一种排序算法。堆是具有下列性质的完全二叉树：每个结点的值都小于或等于其左右孩子结点的值（称为小根堆）；或者每个结点的值都大于或等于其左右孩子结点的值（称为大根堆）。

![avatar](https://static.scar.vip/interview-vuepress/image/heap-sort.gif)

#### 算法描述：
- 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
- 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
- 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

#### 代码实现：

```js
// 多个函数需要用到数据长度，把len设为全局变量
var len;
// 建立大顶堆
function buildMaxHeap(arr) {
    len = arr.length;
    for(var i = Math.floor(len/2); i >= 0;i--) {
        heapify(arr, i);
    }
}
// 堆调整
function heapify(arr, i) {
     var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function HeapSort(arr) {
    buildMaxHeap(arr);
}
```



## 归并排序
 归并排序，是一种借助“归并”进行排序的方法，归并的含义是将两个或两个以上的有序序列归并成一个有序序列的过程。归并排序的主要思想：将若干有序序列逐步归并，最终归并为一个有序序列。

![avatar](https://static.scar.vip/interview-vuepress/image/merge-sort.gif)

#### 算法描述：
- 把长度为n的输入序列分成两个长度为n/2的子序列；
- 对这两个子序列分别采用归并排序；
- 将两个排序好的子序列合并成一个最终的排序序列。

#### 代码实现：

```js
function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
```



## 计数排序
计数排序，不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

![avatar](https://static.scar.vip/interview-vuepress/image/counting-sort.gif)

#### 算法描述:
- 找出待排序的数组中最大和最小的元素；
- 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
- 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
- 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。

#### 代码实现：
```js
function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}
```



## 桶排序
桶排序，是一种简单的分配排序，其工作原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。

![avatar](https://static.scar.vip/interview-vuepress/image/bucket-sort.gif)
#### 算法描述：
- 设置一个定量的数组当作空桶；
- 遍历输入数据，并且把数据一个一个放到对应的桶里去；
- 对每个不是空的桶进行排序；
- 从不是空的桶里把排好序的数据拼接起来。
#### 代码实现：
```js
function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
      return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minValue = arr[i];                // 输入数据的最小值
      } else if (arr[i] > maxValue) {
          maxValue = arr[i];                // 输入数据的最大值
      }
    }

    // 桶的初始化
    var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    // 利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}
```



## 基数排序
基数排序，是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。

![avatar](https://static.scar.vip/interview-vuepress/image/radix-sort.gif)
#### 算法描述：
- 取得数组中的最大数，并取得位数；
- arr为原始数组，从最低位开始取每个位组成radix数组；
- 对radix进行计数排序（利用计数排序适用于小范围数的特点）。
#### 代码实现：
```js
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```


### 总结
10种排序算法做以下总结对比（图示待补充）：


从平均时间复杂度来看，7种比较排序效率由低到高依次是：冒泡排序 ≈ 选择排序 ≈ 插入排序< 希尔排序< 堆排序 < 归并排序< 快速排序

<strong>快速排序</strong>是效率最高的，适用于数据量大且数值随机排列的情况。但如果数据已经基本有序的情况下，效率退化到O(n^2)。

<strong>冒泡排序</strong>是最慢的排序算法，在实际应用是效率最低的算法，时间复杂度为O(n^2)。

<strong>选择排序</strong>在实际应用中和冒泡排序基本差不多，使用较少。

<strong>插入排序</strong>比冒泡排序快2倍。一般不适合数据量比较大的场合或数据重复比较多的场合。

<strong>希尔排序</strong>比冒泡排序快5倍，比插入排序大致快2倍。Shell排序比起快速排序，归并排序，堆排序慢很多。但shell算法比较简单，特别适合数据量在5000以下且性能要求不是很高的场合。

<strong>堆排序</strong>由于不需要大量的递归或者多维的暂存数组，只需要一个用来交换的暂存空间，因此这对于数据量非常巨大的序列是很合适的。

<strong>归并排序</strong>比堆排序稍微快一点，由于它需要一个额外的数组，因此需要比堆排序多一些内存空间。

### 如何选择排序算法？
1、若n较小(n<=50)，可采用直接插入排序和选择排序；<br>
2、若n较小，考虑稳定性，可选择计数排序、基数排序和桶排序；<br>
3、若n较大，应采用时间复杂度为O(nlog n)的排序算法：快速排序、堆排序和归并排序。（若n个元素存在重复元素，使用归并排序较为合适）<br>

