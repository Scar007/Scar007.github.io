---
title: 正则
---
## 正则表达式匹配手机号
```js
function checkPhone(){
  if(!(/^1[345678]\d{9}$/.test(phone))){
    alert("手机号码有误，请重填");
    return false;
  }
}
```




## 邮箱验证
```js
var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
```