/*
 * @Author: your name
 * @Date: 2020-12-12 18:19:48
 * @LastEditTime: 2020-12-12 18:41:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /note-2020/promise/generatorAsyncAwait.js/index.js
 */

// 最早解决异步的方法就是回调 => Promise (还是需要.then) => generator =>async await
function * read(){

}
let it = read() //iterator 迭代器 迭代器中有next方法
console.log( read.next());


