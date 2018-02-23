var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports= mongoose.Schema({
    name: String,
    age : String,
    address: String,
    status: String
    //createddate:{type:Date, default:Date.now,
    // }
});

