---
publish: false
title: Vue的双向绑定
createTime: 2021/02/05 12:01:09
permalink: /blog/eswwr3ms/
---

测试html：
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
<script src="./vue.js"></script>
<body>
    <div id="app">
        <form>
            <input type="text"  v-model="number">
            <button type="button" @click="increment">增加</button>
        </form>
        <h3 v-text="number"></h3>
    </div>
    <script>
        const vm = new Vue({
            el:'#app',
            data: {
                number: 0
            },
            methods: {
                increment: function() {
                    this.number ++;
                },
            }
        })
    </script>
</body>
</html>
```

Vue双向绑定实现：
```JavaScript
class Observer{
    constructor(data){
        this.$data = data;
        this.observer(this.$data);
    }
    observer(obj){
        if(typeof obj !== 'object') return;
        Object.keys(obj).forEach(key =>{
            this.defineReactive(obj, key, obj[key]);
        })
    }
    defineReactive(obj, key, value){
        if(typeof value === 'object') this.observer(value);
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            get(){
                if(window.target){
                    dep.addSubs();
                }
                return value;
            },
            set: (newVal) =>{
                if(value === newVal) return;
                // 防止 newVal为对象的情况，需要重新将对象中的属性变为响应式
                this.observer();
                value = newVal;
                dep.notify();
            }
        })
    }
}
class Dep{
    constructor(){
        this.subs = [];
    }
    addSubs(){
        this.subs.push(window.target);
    }
    notify(){
        this.subs.forEach(watcher => watcher.update());
    }
}
class Watcher{
    constructor(vm, expr, cb){
        this.$vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.getter();
    }
    update(){
        let newVal;
        if(typeof this.expr === 'function'){
            newVal = this.expr();
        } else {
            newVal = compileUtil.getValue(this.expr, this.$vm);
        }
        // let newVal = compileUtil.getValue(this.expr, this.$vm);
        if(this.value === newVal) return; 
        this.value = newVal;
        this.cb();
    }
    getter(){
        window.target = this;
        if(typeof this.expr === 'function'){
            this.value = this.expr();
        } else {
            this.value = compileUtil.getValue(this.expr, this.$vm);
        }
        window.target = null;
    }
}

// Class版
class Vue{
	constructor(options){
    	this.$data = options.data;
        this.$el = options.el;
        this.$option = options;
        if(this.$el){
          // 将数据变为响应式
          new Observer(this.$data)
          // 代理$data
          this.proxyVm(this.$data)
          // 代理computed
          this.proxyVm(this.$option.computed)
          // 编译模板
          new Compile(this.$el, this)
        }
    }
    proxyVm(data) {
        for(let key in data){
            Object.defineProperty(this, key, {
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}
class Compile{
    constructor(el, vm){
        this.$el = this.isElementNode(el) ? el: document.querySelector(el);
        this.$vm = vm;
        // 在内存中创建一个和 $el相同的元素节点
        let fragment = this.node2fragment(this.$el);
        // 解析模板($el节点)
        this.compile(fragment);
        // 将解析后的节点重新挂载到DOM树上
        this.$el.appendChild(fragment);
    }
    // 判断node是否为元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
    // 判断是否为v-开头的Vue指令
    isDirective(attr) {
        return attr.startsWith('v-');
    }
    isSpecialisDirective(attr){
        return attr.startsWith('@');
    }
    compile(fragment){ 
        // 获取根节点的子节点
        let childNodes  = fragment.childNodes;
        [...childNodes].forEach(child =>{
            if(this.isElementNode(child)){
                // 解析元素节点的属性,查看是否存在Vue指令
                this.compileElement(child);
                // 如果子节点也是元素节点,则递归执行该函数
                this.compile(child);
            }else{
                // 解析文本节点,查看是否存在"{{}}"
                this.compileText(child);
            }
        })
    }
    // 编译元素
    compileElement(node){
        // 获取元素节点的所有属性
        let attrs = node.attributes;
        // 遍历所有属性,查找是否存在Vue指令
        [...attrs].forEach(attr =>{ 
            // name: 属性名, expr: 属性值
            let {name, value:expr} = attr; 
            // 判断是不是指令
            if(this.isDirective(name)){
                let [,directive] = name.split('-');
                // 如果为指令则去设置该节点的响应式函数 
                compileUtil[directive](node, expr, this.$vm);
            }
            if(this.isSpecialisDirective(name)){
                let eventName = name.substr(1);
                compileUtil['on'](node, eventName, expr, this.$vm);
            }
        })
    }
    // 编辑文本
    compileText(node){
        let content = node.textContent;
        // 匹配 {{xxx}}
        if(/\{\{(.+?)\}\}/.test(content)){
            compileUtil['contentText'](node, content, this.$vm);
        }
    }
    // 把节点移动到内存中
    node2fragment(node){
        // 创建文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = node.firstChild){
            // appendChild具有移动性
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
}
const compileUtil = {
    getValue(expr, vm){
        let valOrFn = expr.split('.').reduce((totalValue, key) =>{
            if(!totalValue[key]) return null;
            return totalValue[key];
        }, vm)
        return typeof valOrFn === 'function' ? valOrFn.call(vm) : valOrFn;
    },
    setValue(expr, vm, value){
        return expr.split('.').reduce((totalValue, key, index, arr) =>{
            if(index === arr.length - 1) totalValue[key] = value;
            return totalValue[key];
        }, vm.$data)
    },
    getContentValue(content, vm){
        return content.replace(/\{\{(.+?)\}\}/g, (...args) =>{
            return this.getValue(args[1], vm); 
         })
    },
    contentText(node, content, vm){
        let fn = () =>{
            this.textUpdater(node, this.getContentValue(content, vm));
        }
        let resText = content.replace(/\{\{(.+?)\}\}/g, (...args) =>{
            // args[1] 为{{xxx}}中的xxx
            new Watcher(vm, args[1], fn);
            return this.getValue(args[1], vm);
        });
        // 首次解析直接替换文本内容
        this.textUpdater(node, resText);
    },
    text(node, expr, vm){
        let value = this.getValue(expr, vm);
        this.textUpdater(node, value);
        let fn = () =>this.textUpdater(node, this.getValue(expr, vm));
        new Watcher(vm, expr, fn);
    },
    textUpdater(node, value){
        node.textContent = value;
    },
    html(node, expr, vm){
        let value = this.getValue(expr, vm);
        this.htmlUpdater(node, value);
        let fn = () =>this.htmlUpdater(node, this.getValue(expr, vm));
        new Watcher(vm, expr, fn);
    },
    htmlUpdater(node, value){
        node.textContent = value;
    },
    model(node, expr, vm){
        let value = this.getValue(expr, vm);
        this.modelUpdater(node, value);
        let fn = () => this.modelUpdater(node, this.getValue(expr, vm));
        node.addEventListener('input', ()=>{
            this.setValue(expr, vm, node.value);
        })
        new Watcher(vm, expr, fn)
    },
    modelUpdater(node, value){
        node.value = value;
    },
    on(node, eventName, expr, vm){
        // 改变this为vm实例
        let fn = vm.$option.methods[expr].bind(vm);
        // 添加事件
        node.addEventListener(eventName, fn);
    }
}
```

