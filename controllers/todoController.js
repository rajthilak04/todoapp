var bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

// Connect DB
mongoose.connect('mongodb://test:test@ds115436.mlab.com:15436/todolist');

// Create Schema - blue print of an object
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'test'}).save(function(err){
//   if(err) throw err;
//   console.log('Saved to DB');
// });

// var data = [
//   {item: 'rajthilak'},
//   {item: 'mani'},
//   {item: 'hoogiya'}  
// ]

module.exports = function(app){
  app.get('/todo', function(req, res){
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', { todos: data });
    });
    
  });
  app.post('/todo', urlEncodeParser, function(req, res){
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item',  function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
}; 
