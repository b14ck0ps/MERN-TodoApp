import express from "express"
import todoSchema from "../Schemas/todoSchema.js"
import { model } from "mongoose"

const taskRoutes = express.Router()

const Todo = model('Todo', todoSchema)

taskRoutes.get('/', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

taskRoutes.post('/', async (req, res) => {
    const todo = await Todo.create({ task: req.body.task })
    res.status(201).json({ m: 'success' })
})

taskRoutes.put('/', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.status = true
    todo.save()
    res.status(200).json({ m: 'updated' })
})

taskRoutes.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
    res.status(200).json({ m: 'deleted' })
})

export default taskRoutes 