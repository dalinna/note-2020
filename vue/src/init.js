import {initState} from "./state";
// import { mountComponent } from "./lifecycle.js";
import {compiletoFunctions} from './compiler/index.js'

export function initMixin(Vue){
  Vue.prototype._init= function(options){
    const vm = this;
    vm.$options = options; // 实例上的属性
    initState(vm); // 初始化状态
    if(vm.$options.el){
      vm.$mount(vm.$options.el);
    }

  }
  Vue.prototype.$mount = function(el){
    el = document.querySelector(el);
    console.log('el',el);
    const vm = this;
    const options = vm.$options;
    if(!options.render){
      let template = options.template;
      if(!template && el){
        template = el.outerHTML;
      }
      // 将模板编译成render函数
      const render = compiletoFunctions(template);
      options.render = render;
    }
  }
}
