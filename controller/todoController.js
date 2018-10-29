var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//Connect to the Database
mongoose.connect('mongodb://test123:test123@ds125453.mlab.com:25453/todo');
//,{useNewUrlParser: true });

//Create a schema-this is like a blueprint
var todoSchema = new mongoose.Schema({
 item: String
});

var Todo = mongoose.model('Todo',todoSchema);
;




var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err,data){
    if(err) throw err;
    res.render('todo',{todos: data});
    });

  });

  app.post('/todo',urlencodedParser,function(req,res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
  //    data.push(req.body);
      res.json(data);
    });

});
  app.delete('/todo/:item',function(req,res){

      Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      });

  });
}
