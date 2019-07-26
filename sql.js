const mysql = require('mysql')

const pool  = mysql.createPool({ //createPool創建連接池的方法
  connectionLimit: 5,            //连接池里创建多少个连接对象,5個
  host     : '192.168.122.174',
  user     : 'root',
  password : 'gama.net',
  database:  'halltest'
   
});

let query = function ( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.query( sql,values, function(err, result) { // 與db建立連線
      if(err){
        console.log('[ ERROR] - ',err.message);
        reject (err.message);
        
      }else{
        console.log('sql',sql,'values',values);
        console.log('--------------------------SQL----------------------------');
        console.log('SQL ID:',result);   
        resolve(result);
      }
        
      
      
  
    })
  })
}



module.exports = {query,}