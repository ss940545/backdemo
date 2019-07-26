var express = require('express');
var app = express.Router();
var mysql = require('./mysql');


////////新增 
app.get('/process_get', function (req, res) {  
  // 输出 JSON 格式
  var response = {
      "account":req.query.account,
      "password":req.query.password
  }; 
 //callback
  mysql.insert(response,function(getallback){
    res.end(JSON.stringify(getallback));
  });

 //promise
  // mysql.insert(response)
  //  .then((resolve) => {
  //      console.log('insert response', resolve);

  //      mysql.selectsql()
  //      .then((resolve) => {res.end(JSON.stringify(resolve))
  //        // console.log('typeof',typeof(resolve[0].account));
  //      })   
  //      .catch((reject) => console.log(reject));
  //  })
  // .catch((reject) => console.log(reject));
  
//  async/await
     

})

//////////刪除
app.post('/delete_get', function (req,res){ 
  var del = {
    "delaccount":req.body.delaccount,
    "delpassword":req.body.delpassword
  };
  ///callback
  mysql.del(del,function (delback){
    res.end(JSON.stringify(delback));
  });

  // mysql.del(del)
  // .then((resolve) =>{
  //     console.log('delete response', resolve);
  //     mysql.selectsql()
  //     .then((resolve) =>{
  //       res.end(JSON.stringify(resolve))
  //     })
  //     .catch((reject) => console.log(reject));
  // })
  // .catch((reject) => console.log(reject));
})

//////////修改
app.post('/updata_get', function (req,res){ 
  var up = {
    "upid":req.body.upid,
    "upaccount":req.body.upaccount,
    "uppassword":req.body.uppassword
  }; 
  //callback
  mysql.up(up,function (updatedata){
    res.end(JSON.stringify(updatedata));
  });
  
  // mysql.up(up)
  // .then((resolve)=>{
  //     console.log('updata response', resolve);
  //     mysql.selectsql()
  //     .then((resolve)=>{
  //       res.end(JSON.stringify(resolve))
  //     })
  //     .catch((reject) => console.log(reject));
  // })
  // .catch((reject) => console.log(reject));
})

///////查詢
app.post('/select_get', function (req,res){ 
  var select = {
    "selaccount":req.body.selaccount,
  }; 
  ///callback
  mysql.select(select, function (callback) {
    res.end(JSON.stringify(callback));
  });   

  // mysql.select(select)
  // .then((resolve)=>{
  //   console.log('select response', resolve);
  //   res.end(JSON.stringify(resolve))
  // })
  // .catch((reject) => console.log(reject));
});

//////計算
// app.get('/cal_get', function (req,res){ 
//   var calnumber = {
//     "setnumber":req.query.setnumber,
   
//   }; 

//   mysql.calnumber(calnumber)
//   .then((resolve)=>{
//     console.log('calnumber response', resolve);
//     res.end(JSON.stringify(resolve))
//     // mysql.calnumberTwo(resolve)
//     // .then((resolve)=>{
//     //   res.end(JSON.stringify(resolve))
//     // })
    
//   })
//   .catch((reject) => console.log(reject));
// });



module.exports = app;