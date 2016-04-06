var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
  text: {type: String, required: true},
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

noteSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      text: ret.text,
      user: ret.user
    };
    return returnJson;
  }
});

noteSchema.pre('find', function(next){
  this.populate('user', 'id');
  next();
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;