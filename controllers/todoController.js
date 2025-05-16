const Todo = require('../models/Todo.model');

// GET all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
};

// POST a new todo
exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({ user: req.user._id, text });
  res.status(201).json(todo);
};

// PUT to update a todo
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.text = req.body.text ?? todo.text;
  todo.completed = req.body.completed ?? todo.completed;

  await todo.save();
  res.json(todo);
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted" });
};

// DELETE all todos
exports.clearTodos = async (req, res) => {
  await Todo.deleteMany({ user: req.user._id });
  res.json({ message: "All todos cleared" });
};
