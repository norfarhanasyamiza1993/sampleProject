var express = require ('express');
var app = express();
var port = 3001;

//req and send //'
app.get('/check', function(req, postres){ // req = request // postres = send to UI
    
    //array
    var bakery = {
                 "batter":
                          [
                                 { "id": "1001", "type": "Regular" },
                                 { "id": "1002", "type": "Chocolate" },
                                 { "id": "1003", "type": "Blueberry" },
                                 { "id": "1004", "type": "Devil's Food" }
                          ]};
    
    //define var from array
    var batter = bakery.batter;
    //console.log(batter);
    
    //replace o to t
  
        
    postres.send({status:'Success', name:'Anas',x:batter}
);
    
});

//listen to port
app.listen(port, function(){
    console.log('app listen on port ' + port);
});