
var express = require ('express');
var mongoose = require ('mongoose');
var app = express();
var jsonConcat = require('json-concat');
var mergeJSON = require("merge-json") ;

// var obj1 = { food: 'pizza', car: 'ford' }
// var obj2 = { animal: 'dog' }

// var test = mergeJSON.merge(obj1, obj2);
// console.log(test);
// var age = "23";
// var status;
// switch (true){

//     case (age<=10):
//     status = "Kid"
//     break;
//     case (age>10)&&(age<=20):
//     status = "Young"
//     break;
//     case (age>20)&&(age<=30):
//     status = "Adult"
//     break;
//     case (age>30)&&(age<=100):
//     status = "Old"
//     break;
//     default:
//     status = "Error"
//     break;
// }

// console.log(status);

//var jsonObj = {};

// var sampleArray = {
//     "data":
//         [
//           { "name": "anas", "age": "12", "address": "penang"}]
                
// }
// var test =sampleArray.data;
// var arr = sampleArray.data;

// for (let i = 0; i < arr.length; i++) {
//     var arrto = arr[i].age;
    
// }
// console.log(arrto);

// for (var i = 0, len = test.length; i < len; i++) {
//     jsonObj =test[i];
// }


// console.log(jsonObj);

var jsonObj = {};

var sampleArray = [
    "logo",
    "Details",
    "titles"
];

for (var i = 0, len = sampleArray.length; i < len; i++) {
    //console.log(len);
    jsonObj['position' + (i + 1)] = sampleArray[i];
}

console.log(jsonObj);

app.post('/createvalue', function(req, res){ 
    
    var str = req.body.data;
    var result;
    var age;
    for (var i = 0; i < str.length; i++) {
        result =str[i]; 
        age = str[i].age;
    
    console.log(result);
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
    KitInfo.save(function(err){})};
    res.send({status:"Success"});
});