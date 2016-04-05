var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var User = require ("./models/user");
var Project = require('./models/project')
var app = express();
var secret = "joliebug";

var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost/devdash');

app.use('/api/projects', expressJWT({secret: secret}));
// app.use('/api/users', expressJWT({secret: secret})
//   .unless({path: ['/api/users'], method: 'post'}));

app.use('/api/users', require('./controllers/users'));
app.use('/api/projects', require('./controllers/projects'));

//Login Route
app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

//below renders any other path to the Angular route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);