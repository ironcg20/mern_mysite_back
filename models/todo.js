const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
  },
  user: {
    type: "String",
  },
});

const Todo = mongoose.model("todo", TodoSchema);
module.exports = Todo;
