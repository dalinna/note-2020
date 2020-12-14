class Observer{
  constructor(value){ // 需要对value属性重新定义
    if(Array.isArray(value)){
      
    }else{
      this.walk(value);
    }
  }
  walk(data){
    Object.keys(data).forEach((key)=>{
      defineReactive(data, key, data[key]);
    })
  }
}

export function defineReactive(data, key, value){
  observe(value); // 对结果递归拦截
  Object.defineProperty(data, key,{
    get(){
      return value;
    },
    set(newValue){
      if(newValue == value) return;
      observe(newValue);
      value = newValue;
    }
  })
}



export function observe(data){
  if(typeof data !== 'object' || data == null){
    return;
  }
  // 通过类来实现对数据的观测
  return new Observer(data);
}
