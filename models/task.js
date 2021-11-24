//link to mongoose
const mongoose = require('mongoose')

//define the schema for the tasks
const taskSchema = new mongoose.Schema({
    task: {
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:false
    }

})

//make this model public with the name of Task
module.exports = mongoose.model('Task', taskSchema)