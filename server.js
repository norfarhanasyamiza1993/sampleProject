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
var arrayFindIndex = require('array-find-index');

console.log(connection.connectionString); // test db url

var Kit = mongoose.model('KitInfo', model,'ustglobal');

mongoose.connect(connection.connectionString,{
    keepAlive:true,
    reconnectTries:Number.MAX_VALUE,
    useMongoClient:true
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/gettotalCount', function (req, res) {
    var address = "Penang";
    var age = "9"; //mandatory
    var getAddress = "";
    var getIndex = "";
    //device code not pass
    var countAddress = ([
        { "$group": {
            "_id": {
                "address": "$address",
                "age": "$age"
            },
            "ageCount": { "$sum": 1 }
        }},
        { "$group": {
            "_id": "$_id.address",
            "ages": { 
                "$push": { 
                    "age": "$_id.age",
                    "count": "$ageCount"
                },
            },
            "count": { "$sum": "$ageCount" }
        }},
        { "$sort": { "count": -1 } },
        //{ "$limit": "" },
        { "$project": {
            "ages": { "$slice": [ "$ages", 2 ] },
            "count": 1
        }}
    ])
    //[{ $group: { _id: "$deviceCode", totalDeviceCode: {$sum: 1}}}]
    try{
        if(!age) throw "age not found"               
            if(address && age){ //If device Code is passed , then take count of particular device and project code.
                Kit.aggregate(countAddress).exec(function (err, docs) {
                    if (err) console.log(err);  
                    
                    for (let i = 0; i < docs.length; i++) {
                        getAddress = docs[i];
                        var inAddress = docs[i]._id;
                        //console.log(getAddress)
                        if (inAddress == address){
                        var x;
                            console.log(docs[3])
                            
                        }

                                                 
                    }//console.log(arr)
                   // if device code exist
                    // if (arr){
                    //     res.send({docs});
                    // }else{
                    //     res.send({"error":"age not exist"});
                    // }
                res.send({docs});     
                });
            }
    } catch (error){
        res.send({error});
    }
});

// app.post('/status', function(req, res){  //update & status array
    
//     //define var for update
//     var str = req.body.data;
//     var objID;
//     var nameVal;
//     var ageVal;
//     var addressVal;

//     for (var i = 0; i < str.length; i++) {
//         result =str[i]; 
//         objID = str[i].id;
//         nameVal = str[i].name;
//         ageVal = str[i].age;
//         addressVal = str[i].address;

//     //check status
//     var age = ageVal;
//     console.log(result);

//     switch (true){

//         case (age>=1)&&(age<=10):
//         status = 'Kid'
//         break;
//         case (age>10)&&(age<=20):
//         status = 'Young'
//         break;
//         case (age>20)&&(age<=30):
//         status = 'Adult'
//         break;
//         case (age>30)&&(age<=100):
//         status = 'Old'
//         break;
//         default:
//         status = 'Error'
//         break;
//     };
//     //update
//     Kit.findByIdAndUpdate({_id: objID}, { $set: {name: nameVal, age:ageVal, address:addressVal, status:status}}, { new: true }, function (err, docs) {  
//         if (err) 
//             if(err.message)
//                 res.send({"Message":"Id not found",err});
//                 else
//                 res.send({"Message":"Error, please contact your system administrator"});
//             //console.log(err);
        
//     })};//loop close
//     res.send('Success');
// //res.send({"Message":"Success"}); 
// });

app.post('/status', function(req, res){  //update & status one
    
    //define var for update
    var objID = req.body.id;
    var nameValue = req.body.name;
    var ageValue = req.body.age;
    var addressValue = req.body.address;
    var status;

    //check status
    var age = ageValue;
    switch (true){

        case (age>=1)&&(age<=10):
        status = 'Kid'
        break;
        case (age>10)&&(age<=20):
        status = 'Young'
        break;
        case (age>20)&&(age<=30):
        status = 'Adult'
        break;
        case (age>30)&&(age<=100):
        status = 'Old'
        break;
        default:
        status = 'Error'
        break;
    };
    //update
    // Kit.update({_id: objID}, { $set: {name:nameValue, age:ageValue, address:addressValue, status:status}}).exec(function(err, docs){   
    // res.json({docs}); 
    // });
    Kit.findByIdAndUpdate(objID, { $set: {name: nameValue, age:ageValue, address:addressValue, status:status}}, { new: true }, function (err, docs) {
        if (err) 
            res.send({"Message":"Id not found"});  
            return;  
            //console.log(err);
        res.send(docs);
    });
});

app.post('/remove', function(req, res){  //remove id
    Kit.remove({_id: '5a66aaf6f3d8d81cf061d1a9'}).exec(function(err, docs){ 
    res.json({docs}); 
    });
});

app.post('/update', function(req, res){  //update id
    Kit.update({_id: '5a66aaf6f3d8d81cf061d19f' }, { $set: { name:'Najah', age :'12', address: 'Penang'}}).exec(function(err, docs){ 
    res.json({docs}); 
    });
});

app.post('/createvalue', function(req, res){  //insert array & switch statement
    
    var str = req.body.data;
    var result;
    var age;
    for (var i = 0; i < str.length; i++) {
        result =str[i]; 
        age = str[i].age;
 
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
    
    var mergeResult = (mergeJSON.merge(result,status));
    var KitInfo = new Kit (mergeResult);
    console.log(mergeResult);
    KitInfo.save(function(err){})};
    res.send({status:"Success"});
});

app.get('/foo', function (req, res){ //greater & less than

    Kit.find({age:{$gte:req.query.agefrom, $lte:req.query.ageto}}).exec(function(err, docs){
    res.json({docs});      
    });
});

app.get('/sortvalue', function(req, res){ //sort
 
    Kit.find({},{name:1}).sort({"name":req.query.sortby //display name only
    }).exec(function(err, docs){
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
    //calculate words
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