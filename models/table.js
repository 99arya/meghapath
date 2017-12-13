var mongoose=require("mongoose")

var tableSchema = new mongoose.Schema({
    name:String,
        tablenumber:Number
        ,
    available:{
        type:Boolean,
        default:true
    }
})



var Table = mongoose.model('Table', tableSchema)

module.exports= Table