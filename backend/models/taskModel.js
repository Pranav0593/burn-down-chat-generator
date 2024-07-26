import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        maxlength: 300
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: 1000
    },
    priority: {
        type: Number,
        required: [true, 'Please add a priority'],
        enum: [1, 2, 3, 4, 5]
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    team: [{
        member: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        responsibilities: {
            type: String, // You can adjust the type based on the nature of responsibilities
        }
    }],
    // New fields for line chart data
    chartData: {
        type: [{
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        }],
        required: true
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
