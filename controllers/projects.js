var express = require('express');
var Project = require('../models/project');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    console.log(req.user._doc.email);  // This is pulling out the logged in user's email
    console.log("looking up projects");
    Project.find(function(err, projects) {
      if (err) return res.status(500).send(err);
      res.send(projects);
    });
  })
  .post(function(req, res) {
    console.log("creating project");
    console.log(req.body);
    Project.create(req.body, function(err, project) {
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