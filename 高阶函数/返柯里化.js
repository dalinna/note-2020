/*
 * @Author: tanlinlin
 * @Date: 2020-12-12 11:28:12
 * @LastEditTime: 2020-12-12 18:04:58
 * @LastEditors: Please set LastEditors
 * @Description: 返柯里化
 * @FilePath: /note-2020/高阶函数/返柯里化.js
 */

// 使用范围变大 ，直接toS
Function.prototype.unCurrying = function(){
 return (...args)=>{
  console.log('XX',this,...args);
  // 此处的this 表示 Object.prototype.toString
  return Function.prototype.call.apply(this,args);
  //  执行 Function.prototype.call() 并且执行过程中this 执行 Object.prototype.toString
 }
}


let toStringFun = Object.prototype.toString.unCurrying();
//  把Object.prototype.toString 看成一个完整的Function 的实例
console.log(toStringFun(123));

