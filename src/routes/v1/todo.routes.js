const express = require('express');
const TodoValidation = require('../../validations/TodoValidation');
const todoController = require('../../controllers/todo.controller');
const todoRouter = express.Router()


todoRouter.get('/todo',todoController.todoList);
todoRouter.post('/todo',TodoValidation.createTodo,todoController.createTodo);
todoRouter.put('/todo',TodoValidation.updateTodo,todoController.updateTodo);
todoRouter.put('/todo/complete',TodoValidation.completeTodo,todoController.completeTodo);
todoRouter.delete('/todo/:task_id',TodoValidation.deleteTodo,todoController.deleteTodo);





module.exports = todoRouter