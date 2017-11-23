var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static file
app.use(express.static('./public'));

//fire up todo todoController
todoController(app);

// Listening paot
app.listen(3000);
console.log('Listening port 3000');
