// Require modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create our express app
var app = express();

//Config the app (app.set)
app.set('view engine', 'ejs');
app.set('vews', path.join(__dirname, 'views'));

app.locals.title = 'First Express';
app.locals.todos = require('./data/todos');

// Mount middleware (app.use)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
  console.log(req.headers['user-agent']);
  next();
});

// Require and mount (app.use) routes
var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(3000, function() {
   console.log('Listening on port 3000');
 });


// Define root route
// app.get('/', function(req, res) {
//   res.render('home');
// });

// app.get('/todos', function(req, res) {
//    res.render('todos/index');
//  });

// app.post('/todos', function(req, res) {
//   app.locals.todos.push({
//     todo: req.body.newTodo,
//     done: false
//   });
//   res.render('todos/index');
// });

// Require and mount goodbye
// app.get('/goodbye', function(req, res) {
//   res.json( {msg: 'Goodbye World', color: 'red'});
// });

// app.get('/goodbye/:name', function(req, res) {
//   res.send(`<h1>Goodbye ${req.params.name}</h1>`);
// });
// // if no params then empty object


// define a root route - original before msg add
// app.get('/', function(req, res) {
//   res.send('<h1>Hello Express!</h1>');
// });

// other old root route
// app.get('/', function(req, res) {
//   var msg = req.query.msg ? req.query.msg : '!';
//   res.send(`<h1>Hello Express ${req.query.msg}</h1>`);
// });

// // Require and mount goodbye
// app.get('/goodbye', function(req, res) {
//   res.send('<h1>Goodbye World!</h1>');
// });

// app.get('/todos', function(req, res) {
//   var todos = [
//     {todo: 'Feed dogs', done: true},
//     {todo: 'Learn Express', done: false},
//     {todo: 'Have fun', done: true}
//   ];
//   res.render('/todos/index', {todos});
// });

