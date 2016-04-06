var mongoose = require("mongoose");

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
      userId: ret.userId
    };
    return returnJson;
  }
});


var Project = mongoose.model("Project", projectSchema);

module.exports = Project;