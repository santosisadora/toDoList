//link to mongoose
const mongoose = require('mongoose')

//this will be used for auth
const plm = require('passport-local-mongoose')

//define the schema for the tasks
const userSchema = new mongoose.Schema({
        username:String,
        password:String
})
//using passport-local-mongoose to extend the model so it can include user management and authentication
userSchema.plugin(plm)


//make this model public
module.exports = mongoose.model('User', userSchema)