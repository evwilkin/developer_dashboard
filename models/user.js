var mongoose = require("mongoose");
var bcrypt   = require('bcrypt');
var Schema = mongoose.Schema;
var Project = require("./project.js");

var userSchema = Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;