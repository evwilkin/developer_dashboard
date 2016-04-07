var express = require('express');
var Todo = require('../models/todo');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    currentUser = req.user._doc._id;
    console.log("looking up todos");
    Todo.find({ user: currentUser }, function(err, todos) {
      if (err) return res.status(500).send(err);
      res.send(todos);
    });
  })
  .post(function(req, res) {
    console.log("creating todo");
    console.log(req.body);
    Todo.create({
      user: req.user._doc._id,
      body: req.body.body
    }, function(err, todo) {
      if (err) return res.status(500).send(err);
      res.send(todo);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
      if (err) return res.status(500).send(err);
      res.send(todo);
    });
  })
  .put(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
      if (err) return res.status(500).send(err);
      todo.body = req.body;
      res.send(todo);
    });
  })
  .delete(function(req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;