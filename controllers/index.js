var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ToDo List' });
});

//GET: /about
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Developer',
                                    content:'This is the content from /about, and this is editable in index.js'});
});

//GET: /tasks  -> don't use this block
//router.get('/tasks', function(req, res, next) {
 //   res.render('tasks', { title: 'Task Details',
 //       content:'This is the content from /tasks, and this is editable in index.js'});
//});


module.exports = router;
