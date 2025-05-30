const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/BankServer", {
//     useNewUrlParser:true
// });
mongoose.connect("mongodb://0.0.0.0:27017/BankServer", {
    useNewUrlParser:true
});
 

const User = mongoose.model("User", {
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});    
 
module.exports = {
    User
};