var express = require('express');
var router = express.Router();

var todos = require('../data/todos');

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/todos', function(req, res) {
   res.render('todos/index', {todos});
 });

router.post('/todos', function(req, res) {
  todos.push({
    todo: req.body.newTodo,
    done:false
  });
  res.render('todos/index', {todos});
});

// Require and mount goodbye
router.get('/goodbye', function(req, res) {
  res.json( {msg: 'Goodbye World', color: 'red'});
});

router.get('/goodbye/:name', function(req, res) {
  res.send(`<h1>Goodbye ${req.params.name}</h1>`);
});
// if no params then empty object



module.exports = router;
