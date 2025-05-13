const Todo = require('../models/Todo.model');

// GET all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// POST a new todo
exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const existing = await Todo.findOne({ text: new RegExp(`^${text}$`, 'i') });
  if (existing) return res.status(400).json({ message: "Todo already exists" });

  const todo = new Todo({ text });
  await todo.save();
  res.status(201).json(todo);
};

// PUT to update a todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo removed" });
};

// DELETE all todos
exports.clearTodos = async (req, res) => {
  await Todo.deleteMany({});
  res.json({ message: "All todos cleared" });
};
