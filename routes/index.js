var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');



// Connection URL
const url = 'mongodb://localhost:27017/todoapp';

// Database Name
const dbName = 'todoapp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  Todo = db.collection('todos');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Todo.find({}).toArray((err, todos) => {
  	if(err){
  		return console.log(err);
  	}
  	res.render('index', {
  		title: 'Todo App',
  		todoList: todos
  	});
  });
});

/* POST to home page */

router.post('/add', (req, res, next) => {
	const todo = {
		text: req.body.title,
		body: req.body.body
	};

	Todo.insert(todo, (err, result) => {
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
});

/* DELETE todo */

router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: ObjectId(req.params.id)};
  Todo.remove(query, (err, response) => {
    if(err){
      console.log(err);
    }
  });
  res.redirect('/');
});

/* UPDATE todo */

router.get('/edit/:id', (req, res, next) => {
  const query = {_id: ObjectId(req.params.id)}
  Todo.find(query).next((err, todo) => {
    if(err){
      return console.log(err);
    }
    console.log(todo.text);
    res.render('edit', {
      title: 'Edit ' + todo._id,
      todo: todo
    })
  });
});

router.post('/edit/:id', (req, res, next) => {
  const query = {_id: ObjectId(req.params.id)}
  // Create todo
  const todo = {
    text: req.body.text,
    body: req.body.body
  }

  // Update todo
  Todo.updateOne(query, {$set:todo}, (err, result) => {
    if(err){
      return console.log(err);
    }
    console.log('Todo Updated...');
    res.redirect('/');
  });
});


module.exports = router;
