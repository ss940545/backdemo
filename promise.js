// 前面宣告的不重要
let newPromise1 = new Promise((resolve, reject) => {
  let ran = parseInt(Math.random() * 5000); // 隨機成功或失敗
  setTimeout(function(){
    resolve('隨機時間完成');
  }, ran);
});
let newPromise2 = new Promise((resolve, reject) => {
  setTimeout(function(){
    resolve('2 秒完成');
  }, 2000);
});
let newPromise3 = new Promise((resolve, reject) => {
  setTimeout(function(){
    resolve('3 秒完成');
  }, 3000);
});
// 這段以前不重要
// 鏈接方法
newPromise1.then((data1) => {
  console.log('data1', data1);
  return newPromise2.then((data2) => {
    return `${data2} + ${data1}` // 回傳 Promise 內的值，讓下一個 then 可以接收
  });
}).then((data3) => {
  console.log('data3', data3);
  return newPromise3.then((data4) => {
    return `${data4} + ${data3}` // 回傳 Promise 內的值，讓下一個 then 可以接收
  });
}).then((data5) => {
  console.log(`最後的 + ${data5}`)
});