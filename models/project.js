var mongoose = require("mongoose");
var User = require ("./user");

var projectSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  description: String,
  technologies: Array,
  userStories: Array,
  requirements: Array,
  link: String,
  todos: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

projectSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name,
      description: ret.description,
      technologies: ret.technologies,
      userStories: ret.userStories,
      requirements: ret.requirements,
      link: ret.link,
      todos: ret.todos,
      user: ret.user
    };
    return returnJson;
  }
});

projectSchema.pre('find', function(next){
  this.populate('user', 'id');
  next();
});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;