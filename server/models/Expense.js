const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const spendingSchema = new Schema({
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
        type: Date,
        default: Date.now,
        
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Spending = model('Spending', spendingSchema);

module.exports = Spending;