let express = require('express')

const router = express.Router()

const Task = require('../models/task')

router.get('/',(req, res)=>{
    Task.find((err, tasks)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{
            res.render('tasks/index',{
                tasks: tasks
            })
        }
    })
    //   res.render('tasks/index')

})


//GET: /tasks/create => add a new task
router.get('/create',(req,res)=>{
    res.render('tasks/create', {
        title:'Add new task'
    })
})

//POST: /tasks/create => process form submission and saving new task
router.post('/create',(req, res)=>{
    //using mongoose model to create a new task
    Task.create({
        task: req.body.task
    },(err,newTask)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{ //in case the task is saved successfully, update the list view
            res.redirect('/tasks')
        }
    })
})

//GET: /tasks/delete/task_id => will delete task based on _id parameter
router.get('/delete/:_id',(req,res)=>{
    //get document id from url parameter
    let _id = req.params._id

    //using mongoose to delete the task and redirecgt
    Task.remove({_id: _id}, (err)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{
            res.redirect('/tasks')
        }
    })

})


//GET: /tasks/edit/task_id => prepopulate field with task
router.get('/edit/:_id',(req,res)=>{
    let _id = req.params._id

    Task.findById(_id,(err, task)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{
            res.render('tasks/edit',{
                title:'Edit task',
                task: task
            })
        }
    })
})

//POST: /tasks/edit/task_id => updating the task with the new values from the field
router.post('/edit/:_id',(req,res)=>{
    let _id = req.params._id

    Task.findByIdAndUpdate({_id: _id},{'task':req.body.task}, null,(err, task)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{
            res.redirect('/tasks')
        }
    })
})

module.exports = router