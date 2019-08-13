import { observable, computed, autorun, when, reaction, action, runInAction } from 'mobx';
class Store{
    @observable str = 'hello';
    @observable num = 50;
    @observable bool = false;
    @computed get mixed(){    //将多个可观察数据组合成一个
        return store.str + '/' + store.num
    }
    @action bar(){
        this.str = 'world';
        this.num = 666;
    }
}
//computed
var store = new Store();
var foo = computed(function(){ return store.str + '/' + store.num});
foo.observe(function(change){
    console.log(change);
})
store.str = 'world';
store.num = 100;

//autorun  可观察数据修改后，自动触发
autorun(()=>{
    console.log(store.mixed)
})
store.str = 'world';
store.num = 100;

//when    条件执行逻辑
when(()=>store.bool, ()=>console.log('it is true'));
store.bool = true;

//reaction    autorun的改进
reaction(()=>[store.str,store.num], arr=>console.log(store.str + '/' + store.num))
store.str = 'world';
store.num = 100;

//action
store.bar();    //reaction只触发一次

//runInAction
runInAction(()=>{
    store.str = 'world';
    store.num = 666;
})