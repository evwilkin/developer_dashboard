var express = require('express');
var User = require('../models/user');
var Project = require('../models/project');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    currentUser = req.user._doc._id;  // This is pulling out the logged in user's email
    console.log("looking up projects");
    Project.find({ user: currentUser }, function(err, projects) {
      if (err) return res.status(500).send(err);
      res.send(projects);
    });
  })
  .post(function(req, res) {
    console.log("creating project");
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

router.get('/:id', function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) return res.status(500).send(err);
    res.send(project);
  });
});

module.exports = router;