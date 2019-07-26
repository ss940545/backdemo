//載入模組
var mysql      = require('mysql');

// 連線
var connection = mysql.createConnection({
  host     : '192.168.122.174',
  user     : 'root',
  password : 'gama.net',
  database: 'halltest'
});
//開始連接
connection.connect();

//////新增
const insert = function (response,getallback){ 
  var  addSql =`INSERT INTO account(id,account,psw) VALUES(null, '${response.account}' , '${response.password}')`;

  connection.query(addSql,function (err, result) {
     if(err){
         console.log('[ ERROR] - ',err.message);
        //  return;
     }else{
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:',result);   
        selectsql(getallback);
      }   
  });
  
}
function selectsql(getallback){           
  var slelectInsertSql = `SELECT * FROM account` ;
  connection.query(slelectInsertSql,function (err, result) {
    if(err){
        console.log('[ ERROR] - ',err.message);
      //  return;
    }else{
      console.log('SELECT ID:',result);        
      getallback(result) ;   
    }    

  });
}

//刪除
const del = function (del,delback){ 
  var  delSql =`DELETE FROM account where account = '${del.delaccount}' `;
  console.log(delSql);
  connection.query(delSql,function (err, result) {
     if(err){
         console.log('[ ERROR] - ',err.message);
        
      }else{
        console.log('--------------------------del----------------------------');
        console.log('DELETE ID:',result);       
        delsql(delback);
      }       
  }); 
}
function delsql(delback){
  var delsqlback= `SELECT * FROM account` ;
  connection.query(delsqlback,function (err, result) {
    if(err){
        console.log('[ ERROR] - ',err.message);
      //  return;
    }else{
      console.log('--------------------------delback----------------------------');
      console.log('DELETE ID:',result);   
      delback(result);    
    }       

  });
}

////////修改
const up = function (up,updatedata){ 
  var  upSql =`UPDATE account 
               SET account = '${up.upaccount}', psw = '${up.uppassword}'
               where id = '${up.upid}' `;
  console.log(up);
  
  connection.query(upSql,function (err, result) {
     if(err){
         console.log('[ ERROR] - ',err.message);
        //  return;
      }else{
        console.log('--------------------------updata----------------------------');
        console.log('UP ID:',result);        
        updatesql(updatedata);
      }       
  });
}
function updatesql(updatedata){
  var updatesql= `SELECT * FROM account` ;
  connection.query(updatesql,function (err, result) {
    if(err){
        console.log('[ ERROR] - ',err.message);
      //  return;
    }else{
      console.log('--------------------------updatadata----------------------------');
      console.log('updata ID:',result);   
      updatedata(result);    
    }       

  });
}

///////查詢
const select = function (select, callback){ 
  var  selSql =` SELECT * FROM account 
                 WHERE account = '${select.selaccount}' `;

  console.log('selsql',selSql);

  connection.query(selSql,function (err, result) {
     if(err){
         console.log('[ ERROR] - ',err.message);
        //  return;
      } 
        console.log('--------------------------select----------------------------');      
        console.log('sel ID:',result);        
        
        callback(result) ;       
  });

}
//結束連線
// connection.end();

module.exports={
  insert,
  del,
  up,
  select,

}


