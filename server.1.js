var connection = require('./connection'); //get connection MongoDB
var model = require('./model');
var express = require ('express');
var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
var app = express();
var bodyParser = require ('body-parser');
var path = require('path');
var port = 3001;
app.use(bodyParser.json());
var jsonConcat = require('json-concat');
var mergeJSON = require('merge-json');
var sortJsonArray = require('sort-json-array');
var queryString = require('query-string');

console.log(connection.connectionString); // test db url

var Kit = mongoose.model('KitInfo', model,'ustglobal');

mongoose.connect(connection.connectionString,{
    keepAlive:true,
    reconnectTries:Number.MAX_VALUE,
    useMongoClient:true
});

//app.use(express.static(path.join(__dirname, 'public')));

app.post('/createvalue', function(req, res){ 
    
    var str = req.body.data;
    //console.log(str);
    //var age = req.body.age;
    // var ageStatus = { "kid": "Kid","teenager": "Teenager","adult": "Adult","old": "Old", "error": "Error"};
    
    // if (age<=10) {
    //     inStatus = ageStatus.kid;
    // } else if ((age>10)&&(age<=20)) {
    //     inStatus = ageStatus.teenager;
    // } else if ((age>20)&&(age<=30)) {
    //     inStatus = ageStatus.adult;
    // }else if ((age>30)&&(age<=100)) {
    //     inStatus = ageStatus.old;
    // } else  {
    //     inStatus = ageStatus.error;  
    // }
    // //console.log(inStatus);
    // status = {"status": inStatus};
    var result;
    var age;
    for (var i = 0; i < str.length; i++) {
        result =str[i]; 
        age = str[i].age;
    
    //console.log(result);
    var status;
    switch (true){

        case (age>=1)&&(age<=10):
        status = {"status": "Kid"}
        break;
        case (age>10)&&(age<=20):
        status = {"status": "Young"}
        break;
        case (age>20)&&(age<=30):
        status = {"status": "Adult"}
        break;
        case (age>30)&&(age<=100):
        status = {"status": "Old"}
        break;
        default:
        status = {"status": "Error"}
        break;
    };
    
    //console.log(result);
    var mergeResult = (mergeJSON.merge(result,status));
    var KitInfo = new Kit (mergeResult);
    console.log(mergeResult);
    KitInfo.save(function(err){})};
    res.send({status:"Success"});
});

app.get('/foo', function (req, res){

    Kit.find({name:req.query.name,
        age:req.query.age,
        address:req.query.address,
        status:req.query.status
    }).exec(function(err, docs){

    res.send({docs});      
    });
});

app.get('/sortvalue', function(req, res){ 
 
    Kit.find({}).sort({"age":req.query.find}).exec(function(err, docs){
    res.json({"Sorted":"Name in Ascending",docs});      
    });
});

app.get('/getvalue', function(req, res){ 
    
    Kit.find({"Gender":"Female"}).exec(function(err, docs){
    res.json(docs);    
    });
    
});

//req and send
app.get('/check', function(req, res){ // req = request // res = send to UI
    
    //define array
    var str = "123,124,234,252";
    //convert to string
    var strArray = str.split(",");
    //check result
    res.send({status:'Success', name:'Anas',x:strArray[1]});
});

//index
app.post('/ex-index', function(req, res){

    var str = req.body.name;
    var index = req.body.index;
    //to Array
    var strArray = str.split(",");
    //console.log(strArray);
    var result = index +" is "+ strArray[(index)]

    res.send({status:'Success', result});
});

//replace
app.post('/ex-replace', function(req, res){

    var input = req.body.word;
    //console.log(input);
    //replace character a and e
    var replaceOpt = input.replace(/a/g,"T").replace(/e/g,"Z");
    
    res.send({status:'Success', before:input, after :replaceOpt});
});

//length
app.post('/ex-length', function(req, res){

    var input = req.body.word;
    //calulcate words
    var calWord = input.split(" ").length;
    //calculate length
    var calLength = input.length;
    //concat
    var result = "Words is " + calWord +" and Length is "+ calLength;

    res.send({status:'Success', x:result});
});

//listen to port
app.listen(port, function(){
    console.log('app listen on port ' + port);
});