import { observable, isArrayLike } from 'mobx';
//array
const arr = observable(['a','s','d']);
//只能监视已有的属性，可以通过extendObserable()监视新增的属性
console.log(arr, isArrayLike(arr))

//原始类型
var num = observable.box(110);
var str = observable.box('hello');
var bool = observable.box(true);

//使用num.set(120)修改，num.get()访问
console.log(num,str,bool)

//修饰符
class Store{
    @observable arr = [];
    @observable map = new Map();
    @observable bool = false;
}