// /Users/duke/Documents/GitHub/RememberMe/server/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const dataService = require('../dataService');

// GET /todos - ดึงรายการ To-Do ทั้งหมด
router.get('/', (req, res) => {
  res.json(dataService.getAllTodos());
});

// POST /todos - สร้าง To-Do ใหม่
router.post('/', (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim() === '') {
      const err = new Error('Text is required and must be a non-empty string.');
      err.status = 400;
      throw err;
    }
    const newTodo = dataService.addTodo(text);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
});

// PUT /todos/:id - อัปเดตสถานะ To-Do
router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      const err = new Error('Invalid Todo ID format.');
      err.status = 400;
      throw err;
    }

    if (typeof completed !== 'boolean') {
      const err = new Error('Completed status must be a boolean.');
      err.status = 400;
      throw err;
    }

    const updatedTodo = dataService.updateTodo(todoId, completed);
    if (!updatedTodo) {
      const err = new Error('Todo not found.');
      err.status = 404;
      throw err;
    }
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// PUT /todos/:id/text - แก้ไขข้อความของ To-Do
router.put('/:id/text', (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      const err = new Error('Invalid Todo ID format.');
      err.status = 400;
      throw err;
    }

    if (!text || typeof text !== 'string' || text.trim() === '') {
      const err = new Error('New text is required and must be a non-empty string.');
      err.status = 400;
      throw err;
    }

    const updatedTodo = dataService.editTodoText(todoId, text);
    if (!updatedTodo) {
      const err = new Error('Todo not found.');
      err.status = 404;
      throw err;
    }
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// DELETE /todos/:id - ลบ To-Do
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      const err = new Error('Invalid Todo ID format.');
      err.status = 400;
      throw err;
    }

    const success = dataService.deleteTodo(todoId);
    if (!success) {
      const err = new Error('Todo not found.');
      err.status = 404;
      throw err;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;