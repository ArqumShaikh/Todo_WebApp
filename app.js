var express=require('express');
var app=express();
var todoController=require('./controller/todoController');
//setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire Controller
todoController(app);


//listen to port
app.listen(3000);
console.log('you are listening to port 3000');
