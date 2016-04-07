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

// JWT on all api routes unless creating new user or logging in
app.use('/api/*', expressJWT({secret: secret})
.unless({path: ['/api/users', '/api/auth'], method: 'post'}));

app.use('/api/users', require('./controllers/users'));
app.use('/api/projects', require('./controllers/projects'));
app.use('/api/todos', require('./controllers/todos'));
app.use('/api/notes', require('./controllers/notes'));

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

app.listen(process.env.PORT || 3000);