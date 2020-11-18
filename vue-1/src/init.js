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
  // Vue.prototype.$mount = function(el){
  //   el = document.querySelector(el);
  //   const vm = this;
  //   const options = vm.options;
  //   vm.$options.el = el;
  //   if(!options.render){
  //     let template = options.template;
  //     if(!template && el){
  //       template = el.outerHTML;
  //     }

  //     const render = compileToFunctions(template);
  //     options.render = render;
  //   }
  //   mounteComponent(vm, el);
  // }
}
