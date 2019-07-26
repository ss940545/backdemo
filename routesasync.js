let express = require('express');
let mysql = require('./mysql_async');
let _ = require('underscore');
let router = express.Router();

////////新增 
router.post('/process_get', async function (req, res) {  
  // 输出 JSON 格式
  console.log('reqqqq',req);
  let response = {
      "id": req.body.id,
      "psw": req.body.psw,
      "name": req.body.name,
      "phone":req.body.phone,
  };
  console.log('response', response);
  try {
      let result =  await mysql.insert(response);
      console.log('result',result);
      return  res.send(result);
  } catch (e) {
      console.log(e)
      return res.send(JSON.stringify(e.data))
  }

})

/////////刪除
router.post('/delete_get', async function (req,res){ 
    let delresponse = {
      "delaccount":req.body.id,
      "delname":req.body.name,
      "delphone":req.body.phone,
    };

    try{
        let delresult =  await mysql.del(delresponse);
        console.log('delresult',delresult);
        return  res.send(delresult);
    }catch(e){
      console.log(e)
      return res.send(JSON.stringify(e.data))
    }
   

})


//////修改
router.post('/updata_get', async function (req,res){ 
    let upresponse = {
      // "upid":req.body.upid,
      "upaccount":req.body.id,
      "uppassword":req.body.psw,
      "upname":req.body.name,
      "upphone":req.body.phone,
    }; 
    console.log('upresponse',upresponse);
    try{
      let upresult = await mysql.up(upresponse);
      return res.send(upresult);
      
    }catch(e){
      console.log(e);
      return res.send(JSON.stringify(e.data));
    }
    
})

/////查詢
router.post('/select_get', async function(req,res){

    let selresponse = {
      "selaccount":req.body.id     //query
    }
    console.log('selresponse', selresponse)
    try{  
        let selresult = await mysql.select (selresponse);
        return res.send(selresult); 
    }catch(e){
      console.log(e);
      return res.send(JSON.stringify(e.data));
    }
    
})
/////查詢All
router.get('/selectall_get', async function(req,res){
  try{  
      let selresult = await mysql.selectAll();  
      return res.send(selresult); 
  }catch(e){
    console.log(e);
    return res.send(JSON.stringify(e.data));
  }
  
})
/////檢查輸入是否為格式錯誤
function validRequireString(value, name) {
  console.log('valid',name);
	if (_.isEmpty(value) && !_.isNumber(value) && !_.isArray(value) && !_.isObject(value) ) {
    throw {
      data: name +  '格式錯誤' 
    };
  }
	if (!_.isString(value)) {
    throw {
      data:  name + ' 格式錯誤'
    };
  };
	return value  ;
  }

module.exports = router;