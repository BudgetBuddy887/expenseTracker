const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const expenseSchema = new Schema({
    description: {
        type: String,      
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2)),
    },
    date: {
    // When purchase made
    // Needs formatting 
        type: Date,
        default: Date.now,
        
    },
    category: {
        type: String,
        required: true,
        trim: true,
    }, 
    // Selection/create new tag to easily identify vendor paid to
    company: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;

