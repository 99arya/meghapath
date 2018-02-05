var mongoose=require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    oname:String,
    restoname:String,
    add1:String,
    add2:String,
    add3:String,
    pin: Number,
    gst:String,
    cin:String,
    phone:String,
    
})

UserSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model("User", UserSchema)