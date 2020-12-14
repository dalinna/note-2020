const STATUS = {
  pending :'PENDING',
  fullfilled :'FULLFILLED',
  rejected :'REJECTED'
}

function resolvePromise(promsie2, x, resolve, reject){

}

class MyPromise{
  constructor(excutor){
    this.status = 'PENDING';
    this.onFullfilledCallback = [];
    this.onRejectedCallback = [];
    const resolve =(value)=>{
      if(this.status === 'PENDING'){
        this.status = STATUS.fullfilled;
        this.value = value;
        this.onFullfilledCallback.forEach(fn=>fn())
      }
    }
    const reject =(reason)=>{
      if(this.status === 'PENDING'){
        this.status = STATUS.rejected;
        this.reason = reason;
        this.onRejectedCallback.forEach(fn=>fn())
      }
    }
    excutor(resolve,reject);
  }
  then(onFullfilled,onRejected){
    let promise2= new Promise((resolve, reject)=>{
      if(this.status === 'FULLFILLED'){
        setTimeout(()=>{
          try{
            let x = onFullfilled(this.value);
            resolve(x);
          }catch(e){
            reject(e);
          }
        },0)
      }
      if(this.status === 'REJECTED'){
        try{
          let x = onRejected(this.value);
          resolve(x);
        }catch(e){
          reject(e);
        }

      }
      if(this.status === 'PENDING'){
        this.onFullfilledCallback.push(()=>{
          try{
            let x = onFullfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e){
            onRejected(e);
          }
        });
        this.onRejectedCallback.push(()=>{
          try{
            let x = onRejected(this.reason)
            resolve(x);
          }catch(e){
            reject(e);
          }
        });
      }
    });

    return promise2;
  }
}
