---
title: 数据处理
---
## computed 和 watch 的区别和运用的场景？
- computed：是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；
- watch：没有缓存性，更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听

#### 运用场景：
- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用watch选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。



## 组件中的data为什么是一个函数？
- 一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。
- 如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。



## 子组件为什么不可以修改父组件传递的Prop？/怎么理解vue的单向数据流？
- Vue提倡单向数据流,即父级props的更新会流向子组件,但是反过来则不行。
- 这是为了防止意外的改变父组件状态，使得应用的数据流变得难以理解。
- 如果破坏了单向数据流，当应用复杂时，debug 的成本会非常高。



## Vue不能检测数组的哪些变动？Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？
Vue 不能检测以下数组的变动：
- 第一类问题
> // 法一：Vue.set Vue.set(vm.items, indexOfItem, newValue) <br>
> // 法二：Array.prototype.splice vm.items.splice(indexOfItem, 1, newValue) 复制代码

- 第二类问题，可使用 splice：
> vm.items.splice(newLength) 复制代码
- 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
- 当你修改数组的长度时，例如：vm.items.length = newLength
- 解决办法：

vm.$set 的实现原理是：
- 如果目标是数组，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）




## vue2.x中如何监测数组变化？
- 使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法，当调用数组api时，可以通知依赖更新。
- 如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。




## 为何不能监测array 和 object 的变化？
[监测变化注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)





## 数据响应(数据劫持)
数据响应的实现由两部分构成：<strong>观察者(watcher)</strong>和<strong>依赖收集器(Dep)</strong>，其核心是defineProperty这个方法，它可以重写属性的get和set方法，从而完成监听数据的改变。

- Observe(观察者)观察props与state
  - 遍历props与state，对每个属性创建独立的监听器(watcher)
- 使用defineProperty重写每个属性的get/set(defineReactive)
  - get：收集依赖
    - Dep.depend()
      - watcher.addDep()
  - set：派发更新
    - Dep.notify()
    - watcher.update()
    - queenWatcher()
    - nextTick
    - flushScheduleQueue
    - watcher.run()
    - updateComponent()

可以先看下边的数据响应的代码实现后，理解了就比较容易看懂上面的脉络了
```js
let data = {a: 1};
// 数据响应性
observe(data);

// 初始化观察者
new Watcher(data, 'name', updateComponent);
data.a = 2;

// 简单表示用于数据更新后的操作
function updateComponent() {
    vm._update(); // patchs
}

// 监视对象
function observe(obj) {
    // 遍历对象，使用get/set重新定义对象的每个属性
    Object.keys(obj).map(key => {
        defineReactive(obj, key, obj[key]);
    })
}

function defineReactive(obj, k, v) {
    // 递归子属性
    if (type(v) == 'object') observe(v);

    // 新建依赖收集
    let dep = new Dep();
    // 定义get/set
    Object.defineProperty(obj, k, {
        enumerable: true;
        configurable: true;
        get: function reactiveGetter() {
            // 当前获取该属性时，证明依赖于该对象，因此被添加进收集器中
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return v
        }
        // 重新设置值时，触发收集器的通知机制
        set: function reactiveSetter(nV) {
            v = nV;
            dep.nofify();
        }
    })
}

// 依赖收集器
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.map(sub => {
            sub.update()
        })
    }
}
Dep.target = null;

// 观察者
class Watcher {
    constructor(obj, key, cb) {
        Dep.targer = this;
        this.cb = cb;
        this.obj = obj;
        this.key = key;
        this.value = obj[key];
        Dep.target = null;
    }
    addDep(Dep) {
        Dep.addSub(this)
    }
    update() {
        this.value = this.obj[this.key];
        this.cb(this.value);
    }
    before() {
        callHook('beforeUpdate');
    }
}
```




## vue中数据监听?
1. 我们都知道object.defineProperty()可以实现以个对象的get和set监听，那如果对象里是多重对象 深度对象的时候呢，
这个时候我们将通过遍历对象监听的方式 实现对立面每一个子对象的监听
2. vue当前版本的数据监听是由问题的 无法对直接操作数组下标值进行监听
3. 所以在vue3中 改用proxy取代了object.defineProperty






## data 两种写法有何不同