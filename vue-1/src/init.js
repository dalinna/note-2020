import {initState} from "./state";
// import { mountComponent } from "./lifecycle.js";


export function initMixin(Vue){
  Vue.prototype._init= function(options){
    const vm = this;
    vm.$options = options; // 实例上的属性
    initState(vm); // 初始化状态
    // if(vm.$options.el){
      // vm.$mount(vm.options.el);
    // }
  }
}
