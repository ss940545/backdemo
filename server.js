var express = require('express');   
var bodyParser = require('body-parser');
var routes = require('./routesasync');

var app = express();

app.use(bodyParser.json());    //bodyParser.json是用来解析json数据格式的
app.use(bodyParser.urlencoded({extended:false})); //用来解析我们通常的form表单提交的数据,false会解析所有JSON.parse支持的格式
                                                  //bodyParser中间件用来解析http请求,解析UTF-8的编码的数据

app.get('/', function (req, res) { 
    res.sendFile( __dirname + "/login.html" );
    console.log(__dirname);
})

//Middleware中介軟體 針對所收到的物件做修改或是解析等處理，然後再傳給下個Middleware，但也可以決定中斷不繼續傳遞
// app.use(function(req, res, next) {
//   console.log('已登入');
//   next();
// });

app.use('/route', routes);



///////連線
var server = app.listen(3000, function () { 
  var host = server.address().address;
  console.log(server.address());

  var port = server.address().port;
  console.log(server.address().port);
 
  console.log("應用實例，访问地址为 http://%s:%s", host, port)
 
})


//結束連線
// connection.end();
//////////結束