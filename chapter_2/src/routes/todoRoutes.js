import express from 'express';
import db from '../db.js'

const router = express.Router();

// To get all the todos for loggedin user
router.get('/', (req, res) => {
    const getTodods = db.prepare(' Select * from todos where user_id = ?')
    const todos = getTodods.all(req.userId)

    res.json(todos)
})

// To create an new todo's
router.post('/', (req,res) => {
    const { task } = req.body
    const createTodo = db.prepare(`Insert into todos (user_id, task, completed) values(?,?,?)`)
    const result = createTodo.run(req.userId, task, 0);
    res.json({id:result.lastInsertRowid, task, completed:0});
})

// Update a todo
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params
    // const { page } = req.query

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updatedTodo.run(completed, id)

    res.json({ message: "Todo completed" })
})

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userId)
    
    res.send({ message: "Todo deleted" })
})


export default router;