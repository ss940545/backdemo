//載入
let mysql = require('./sql');
// let _ = require('underscore'); 

//////新增
const insert = async function (response){ 
  try{
    let para = [response.id, response.psw, response.phone, response.name,];
    
    //sql要先查詢是否重複
    let addselsql = ` SELECT * FROM account 
                      WHERE account = ? `;
    let data = await mysql.query(addselsql, para[0]);

    //新增sql
    let addSql =`INSERT INTO account(account,psw,phone,name,showlist) VALUES(?,?,?,?,'1')`;
    
    //查詢全部
    let selsql = ` SELECT * FROM account 
                   `;
    
    //判斷是否有查詢值
    if(data.length >0){
       console.log('有值');
       return data ='此帳號已經有人使用，請重新輸入';

    }else{
      console.log('沒值');
      //新增sql進去
      let addseldata = await mysql.query(addSql, para);
      console.log('addseldata',addseldata);
      let selectdata = await mysql.query(selsql);
      return selectdata;
    }
    
  } catch(e){
     throw e;
  }
};

//////刪除
const del = async function(delresponse){
  try{
    let delpara = [delresponse.delaccount , delresponse.delname, delresponse.delphone];
    //查詢是否有帳號密碼
    delsel = `SELECT * FROM account WHERE account = ? and name =? and phone=? `;
    let delseldata = await mysql.query(delsel,delpara);

    //刪除
    let delSql =`UPDATE account  SET showlist='0'
                  where account = ? and name =? and phone=?  `;       
    //查詢全部
    let selsql = ` SELECT * FROM account where showlist ='1' `;

    if(delseldata.length >0){
      console.log('帳密正確');
      let deltotaldata = await mysql.query(delSql,delpara);
      let deldata = await mysql.query(selsql);
      return deldata;
    }else{
      console.log('帳密填寫錯誤');
      return delseldata = '填寫錯誤';
    }
  }catch(e){
      throw e;
  }
}

//////修改
const up = async function(upresponse){
  try{
    let uppara = [upresponse.upaccount, upresponse.uppassword , upresponse.upname, upresponse.upphone];
    let upsle = `SELECT * FROM account WHERE account = ?  `;
    let upsql = `UPDATE account 
                 SET name = ?, psw = ? ,phone=?
                 where account = ? `;
    //查詢全部
    let selsql = ` SELECT * FROM account  where showlist='1' `;

    //查詢是否有 account  
    let updata = await mysql.query(upsle , uppara[0] );
    
    if(updata.length >0){ 
      console.log('id正確');
      //更改ＤＢ要修改的資料
      await mysql.query(upsql , [uppara[2] ,uppara[1], uppara[3], uppara[0] ] );
     
      //更改後重新跟ＤＢ在拿一次資料
      let upbackdata = await mysql.query(selsql );
      return upbackdata ;
    }else{
      console.log('帳號無法更改');
      return updata ='帳號無法更改';
    }
  }catch(e){
    console.log('a');
    throw e;
  }
}

/////查詢
const select = async function(selresponse){
  try{
    let selpara = [selresponse.selaccount];
    let selsql = ` SELECT * FROM account 
                  WHERE account = ? `;

    ///先查詢有沒有此帳號
    let seldata = await mysql.query(selsql ,selpara);
    console.log('seldata', seldata);
    if(seldata.length>0){
      console.log('有此帳號');
      return seldata;
    }else{
      console.log('無此帳號，請重新輸入');
      return seldata ='無此帳號，請重新輸入' ;
    }
  }catch(e){
    throw e;
  }
}

/////查詢ＡＬＬ
const selectAll = async function(){
  try{
    let selsql = ` SELECT * FROM account where showlist='1'
                   `;
    ///先查詢有沒有此帳號
    let seldata =await mysql.query(selsql);    
    let length= seldata.length;
    if(length>0){
      for(i = 0; i < length; i++){
        console.log('有此帳號', length);
        return seldata;
      }
    }else{
      console.log('無此帳號，請重新輸入');
      return seldata ='無此帳號，請重新輸入' ;
    }
  }catch(e){
    throw e;
  }
}
module.exports={
  insert,
  del,
  up,
  select,
  selectAll
}