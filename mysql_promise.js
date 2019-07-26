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
const insert =  function (response){ 
  return new Promise((resolve,reject)=>{
    var  addSql =`INSERT INTO account(id,account,psw) VALUES(null, '${response.account}' , '${response.password}')`;
    connection.query(addSql,function (err, result) {
        if(err){
          // console.log('[ ERROR] - ',err.message);
          reject(err.message);
        }else{
          console.log('--------------------------INSERT----------------------------');
          console.log('INSERT ID:',result);   
          resolve(result);
          
        }   
        connection.release();
    });
  });
};

 function selectsql(){   
  return new Promise((resolve,reject)=>{
      var slelectInsertSql = `SELECT * FROM account` ;
        connection.query(slelectInsertSql,function (err, result) {
          if(err){
              console.log('[ ERROR] - ',err.message);
              reject(err.message);
            
          }else{
            console.log('SELECT ID:',result);        
            resolve(result) ; 
            console.log('typeof2',typeof(result[0].account)); 
          }    
          connection.release();
        });
  })        
}

//刪除
const del = function (del){ 
  return new Promise((resolve , reject)=>{
    var  delSql =`DELETE FROM account where account = '${del.delaccount}' `;
    console.log(delSql);
    connection.query(delSql,function (err, result) {
        if(err){
            // console.log('[ ERROR] - ',err.message);
            reject(err.message)
        }else{
            console.log('--------------------------del----------------------------');
            console.log('DELETE ID:',result);       
            resolve(result);
        }  
        connection.release();     
    }); 
  })
  
}

////////修改
const up = function (up){ 
  return new Promise((resolve,reject)=>{
      var  upSql =`UPDATE account 
                  SET account = '${up.upaccount}', psw = '${up.uppassword}'
                  where id = '${up.upid}' `;
      console.log(up);
      
      connection.query(upSql,function (err, result) {
        if(err){
            // console.log('[ ERROR] - ',err.message);
            reject(err.message)

          }else{
            console.log('--------------------------updata----------------------------');
            console.log('UP ID:',result);        
            resolve(result);

          }  
          connection.release();     
      });
  })
  
}

///////查詢
const select = function (select){ 
  return new Promise ((resolve,reject)=>{
      var  selSql =` SELECT * FROM account 
                  WHERE account = '${select.selaccount}' `;

      console.log('selsql',selSql);

      connection.query(selSql,function (err, result) {
        if(err){
            console.log('[ ERROR] - ',err.message);
            reject(err.message);
          } 
            console.log('--------------------------select----------------------------');      
            console.log('sel ID:',result);           
            resolve(result) ; 
            connection.release();      
      });
  })
  
}

////////計算
const calnumber = function(calnumber){
    return new Promise ((resolve, reject)=>{
        var calnew = parseInt(calnumber.setnumber)+1;
        console.log('calnew',calnew);
        resolve(calnew);

    })
}
function calnumberTwo (a){
  return new Promise ((resolve, reject)=>{
    var calnumberTwonew = a +1;
      connection.query(calnumberTwonew, function(err, result){
        if(err){
          reject(err.message);
        }
          console.log('calnumberTwo', result);
          resolve(result);
      })
  })
}
module.exports={
  insert,
  selectsql,
  del,
  up,
  select,
  calnumber,
  calnumberTwo
}