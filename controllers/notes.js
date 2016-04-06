var express = require('express');
var Note = require('../models/note');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    /*currentUser = req.user._doc._id;*/  // This is pulling out the logged in user's email
    console.log("looking up notes");
    Note.find(/*{ user: currentUser },*/ function(err, notes) {
      if (err) return res.status(500).send(err);
      res.send(notes);
    });
  })
  .post(function(req, res) {
    console.log("creating note");
    console.log(req.body);
    Note.create(req.body, function(err, note) {
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
  });

module.exports = router;