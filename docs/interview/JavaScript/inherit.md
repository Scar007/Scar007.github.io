---
title: 继承
---
## 文章链接
[JS面向对象继承](https://www.scar.vip/%e5%89%8d%e7%ab%af/javascript%e9%9d%a2%e5%90%91%e5%af%b9%e8%b1%a1%e7%bb%a7%e6%89%bf/)

## 面试题
#### 评价一下三种方法实现继承的优缺点,并改进
```js
function Shape() {}

function Rect() {}

// 方法1
Rect.prototype = new Shape();

// 方法2
Rect.prototype = Shape.prototype;

// 方法3
Rect.prototype = Object.create(Shape.prototype);

Rect.prototype.area = function () {
  // do something
};
```
<strong>方法 1：</strong>
- 优点：正确设置原型链实现继承
- 优点：父类实例属性得到继承，原型链查找效率提高，也能为一些属性提供合理的默认值
- 缺点：父类实例属性为引用类型时，不恰当地修改会导致所有子类被修改
- 缺点：创建父类实例作为子类原型时，可能无法确定构造函数需要的合理参数，这样提供的参数继承给子类没有实际意义，当子类需要这些参数时应该在构造函数中进行初始化和设置<br>

总结：继承应该是继承方法而不是属性，为子类设置父类实例属性应该是通过在子类构造函数中调用父类构造函数进行初始化<br>

<strong>方法 2：</strong>
- 优点：正确设置原型链实现继承
- 缺点：父类构造函数原型与子类相同。修改子类原型添加方法会修改父类

<strong>方法 3：</strong>
- 优点：正确设置原型链且避免方法 1.2 中的缺点
- 缺点：ES5 方法需要注意兼容性

<strong>改进：</strong>
- 所有三种方法应该在子类构造函数中调用父类构造函数实现实例属性初始化
```js
function Rect() {
    Shape.call(this);
}
```