let express = require('express')

const router = express.Router()

const Task = require('../models/task')

//requiring passport for auth
const passport = require('passport')

//function to check if the user is authenticated or not.This function is called in create, edit and delete methods
function authCheck(req,res,next){
    //using express to chgeck user identity
    if(req.isAuthenticated()){
        return next()
    }
    //if the user is not found, go to login
    res.redirect('/login')
}



//GET: /tasks
router.get('/',(req, res)=>{
    Task.find((err, tasks,notes)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{
            res.render('tasks/index',{
                tasks: tasks,
                notes:notes,
                title:'Tasks',
                user: req.user

            })
        }
    })
    //   res.render('tasks/index')

})


//GET: /tasks/create => add a new task - function authCheck is called
router.get('/create', authCheck,(req,res)=>{
    res.render('tasks/create', {
        title:'Add new task',
        user: req.user
    })
})

//POST: /tasks/create => process form submission and saving new task - function authCheck is called
router.post('/create',authCheck,(req, res)=>{
    //using mongoose model to create a new task
    Task.create({
        task: req.body.task,
        notes: req.body.notes,
    },(err,newTask,newNotes)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{ //in case the task is saved successfully, update the list view
            res.redirect('/tasks')
        }
    })
})

//GET: /tasks/delete/task_id => will delete task based on _id parameter - function authCheck is called
router.get('/delete/:_id',authCheck,(req,res)=>{
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


//GET: /tasks/edit/task_id => prepopulate field with task - function authCheck is called
router.get('/edit/:_id', authCheck,(req,res)=>{
    let _id = req.params._id

    Task.findById(_id,(err, task,notes)=>{
        if(err){
            console.log(err)
            res.end(err)
        }
        else{
            res.render('tasks/edit',{
                title:'Edit task',
                task: task,
                notes:notes,
                user: req.user
            })
        }
    })
})

//POST: /tasks/edit/task_id => updating the task with the new values from the field - function authCheck is called
router.post('/edit/:_id',authCheck,(req,res)=>{
    let _id = req.params._id

    Task.findByIdAndUpdate({_id: _id},{'task':req.body.task,'notes':req.body.notes}, null,(err, task)=>{
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