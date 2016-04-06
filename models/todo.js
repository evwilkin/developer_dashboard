var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
  body: {type: String, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

todoSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      body: ret.body,
      user: ret.user
    };
    return returnJson;
  }
});


var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;