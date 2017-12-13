var mongoose = require("mongoose")
mongoose.set('debug', true)
// mongoose.connect('mongodb://localhost/cafe-api')


mongoose.Promise=Promise;

module.exports.Table=require("./table")