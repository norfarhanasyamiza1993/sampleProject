var express = require ('express');
var app = express();
var port = 3001;

//req and send //'
app.get('/check', function(req, postres){ // req = request // postres = send to UI
    
    //define array
    var str = "123,124,234,252";

    //for loop
    for (let i = 0; i < str.length; i++) {
        var strArray = str;
        
    
    //convert to string
    //var strArray = str.split(",");
    //send output to UI
    postres.send({status:'Success', name:'Anas',x:strArray});
}});

//listen to port
app.listen(port, function(){
    console.log('app listen on port ' + port);
})