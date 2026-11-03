const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// CRUD de Tareas (Protegido con auth)
router.get('/', auth, async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) { next(error); }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, user: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) { next(error); }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ msg: 'No autorizado' });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) { next(error); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });
    if (task.user.toString() !== req.user.id) return res.status(401).json({ msg: 'No autorizado' });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Tarea eliminada' });
  } catch (error) { next(error); }
});

module.exports = router;