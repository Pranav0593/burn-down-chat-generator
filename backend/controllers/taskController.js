import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import mongoose from "mongoose";

// @desc  Get user tasks
// @route  GET /api/tasks
// @access  Private
const getTasks = expressAsyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        const tasks = await Task.find({ user: req.user.id });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// @desc  Get user task
// @route  GET /api/tasks/:id
// @access  Private
const getTask = expressAsyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        if (task.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error getting task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// @desc  Create task
// @route  POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        const { title, description, priority, startDate, endDate, team, chartData } = req.body;

        if (!title || !description || !priority || !team || !chartData) {
            res.status(400);
            throw new Error('Please provide a title, description, priority, team, and chartData');
        }

        const validTeam = team.map(member => {
            if (!member.role || !member.member) {
                res.status(400);
                throw new Error('Please provide a role and member for each team member');
            }

            return {
                role: member.role,
                member: member.member,
                responsibilities: member.responsibilities,
            };
        });

        const task = await Task.create({
            title,
            description,
            priority,
            user: req.user.id,
            startDate,
            endDate,
            team: validTeam,
            chartData,
        });

        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// @desc  Update task
// @route  PUT /api/tasks/:id
// @access  Private
const updateTask = expressAsyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        if (task.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// @desc  Delete task
// @route  DELETE /api/tasks/:id
// @access  Private
const deleteTask = expressAsyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        if (task.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        await task.remove();

        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// @desc  Delete tasks
// @route  DELETE /api/tasks
// @access  Private
const deleteTasks = expressAsyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        const tasks = await Task.find({ user: req.user.id });

        if (!tasks) {
            res.status(404);
            throw new Error('There are no tasks for that user');
        }

        tasks.forEach(task => {
            task.remove();
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export { getTasks, getTask, createTask, updateTask, deleteTask, deleteTasks };
