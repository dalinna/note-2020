import { observe } from "./observe/index.js";


export function initState(vm){
  // 将所有数据定义在vm实例上，数据代理object.defineproperty
  const opts = vm.$options;
  if(opts.data){ // 数据的初始化
    initData(vm);
  }
}
function proxy(vm, source, key){
  Object.defineProperty(vm, key,{
    get(){
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue;
    }
  })
}

function initData(vm){
  // 数据劫持 object.defineproperty
  let data = vm.$options.data;
  data = vm._data  = typeof data === 'function'?data.call(vm):data;
  for(let key in data){
    proxy(vm, '_data', key);  //vm[_data][key]
  }
  observe(data); // 观测数据
}


