// controllers/todo.js
const Todo = require("../models/todo");
const ObjectId = require("mongoose").Types.ObjectId;

// exports.getAllTodo = (req, res) => {
//   Todo.find()
//     .then((todo) => res.json(todo))
//     .catch((err) =>
//       res.status(404).json({ message: "Todo not found", error: err.message }),
//     );
// };
exports.getAllTodo = (req, res) => {
  const { user } = req.query;
  Todo.find({ user })
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message }),
    );
};

exports.getById = (req, res) => {
  const { _id } = req.params;
  Todo.findById(_id)
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message }),
    );
};
// exports.getById = (req, res) => {
//   const { _id } = req.params; // Change from req.query to req.params
//   Todo.findById(_id)
//     .then((todo) => {
//       if (!todo) {
//         return res.status(404).json({ message: "Todo not found" });
//       }
//       res.json(todo);
//     })
//     .catch((err) =>
//       res
//         .status(500)
//         .json({ message: "Error retrieving todo", error: err.message }),
//     );
// };

exports.postCreateTodo = (req, res) => {
  Todo.create(req.body)
    .then((data) => res.json({ message: "Todo added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message }),
    );
};

exports.putUpdateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message }),
    );
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((data) => res.json({ message: "todo deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message }),
    );
};
