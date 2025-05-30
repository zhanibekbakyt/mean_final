const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://zhanibekbakyt:12345Zhanibek@cluster1.tlx4mkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
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