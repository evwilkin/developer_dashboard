var express = require('express');
var Note = require('../models/note');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    currentUser = req.user._doc._id;
    Note.find({ user: currentUser }, function(err, notes) {
      if (err) return res.status(500).send(err);
      res.send(notes);
    });
  })
  .post(function(req, res) {
    console.log(req.body);
    Note.create({
      user: req.user._doc._id,
      text: req.body.text
    }, function(err, note) {
      if (err) return res.status(500).send(err);
      res.send(note);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Note.findById(req.params.id, function(err, note) {
      if (err) return res.status(500).send(err);
      res.send(note);
    });
  })
  .put(function(req, res) {
    Note.findById(req.params.id, function(err, note) {
      if (err) return res.status(500).send(err);
      note.body = req.body;
      res.send(note);
    })
  })
  .delete(function(req, res) {
    Note.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;