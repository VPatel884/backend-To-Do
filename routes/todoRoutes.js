const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearTodos
} = require('../controllers/todoController');
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/', clearTodos);

module.exports = router;
