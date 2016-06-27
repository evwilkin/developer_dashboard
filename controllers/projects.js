var express = require('express');
var User = require('../models/user');
var Project = require('../models/project');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    currentUser = req.user._doc._id;
    Project.find({ user: currentUser }, function(err, projects) {
      if (err) return res.status(500).send(err);
      res.send(projects);
    });
  })
  .post(function(req, res) {
    Project.create({
      user: req.user._doc._id,
      name: req.body.name,
      description: req.body.description,
      technologies: req.body.technologies,
      userStories: req.body.userStories,
      requirements: req.body.requirements,
      link: req.body.link,
      todos: req.body.todos,
    }, function(err, project) {
      if (err) return res.status(500).send(err);
      res.send(project);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return res.status(500).send(err);
      res.send(project);
    });
  })
  .put(function(req, res) {
    Project.findById(req.params.id, function(err, project) {
      if (err) return res.status(500).send(err);
      project.body = req.body;
      res.send(project);
    });
  })
  .delete(function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });


module.exports = router;