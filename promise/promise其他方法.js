/*
 * @Author: 谭琳琳
 * @Date: 2020-12-12 15:15:16
 * @LastEditTime: 2020-12-12 18:23:21
 * @LastEditors: Please set LastEditors
 * @Description: 谭琳琳
 * @FilePath: /note-2020/promise/read.js
 */

//  promise.finally 无论成功失败都执行

promise.finally(()=>{
  // <!-- 如果这里返回promise，则后面的then会等待promise状态改变成resolved || rejected -->
}).then((val)=>{

},catch(reason)=>{

})


// ### promsie.race
let p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1);
  },1000)
})
let p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject('false');
  },500)
})
// 谁先成功就用谁的值
//  解决的问题：
Promise.race([p1,p2]).then(data=>{
  console.log(data);
}).catch(err=>{
  console.log(err);
})


let p3 =new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('p1成功');
  },1000)
})
function wrap(promise){
  let abort;
  let p = new Promise((resolve,reject)=>{ //为了通过p控制newP的结果
    abort = reject;
  })
  let newP =Promise.race([p,promise]);
  newP.abort = abort
  return newP;
}
let p4 = wrap(p3);
setTimeout(()=>{
  p4.abort('外面的先失败了');
}, 500);
p4.then(val=>{
  console.log('val',val);
}).catch(err=>{
  console.log('err',err);
})





