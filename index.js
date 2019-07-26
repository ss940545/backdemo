var express = require('express');
var app = express();

app.get('/a', function(req, res){
    res.send('Hello world1!');
});
app.get('/b', function(req, res){
    res.send('bcv!');
});
app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});