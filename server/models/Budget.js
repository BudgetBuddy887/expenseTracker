const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const budgetSchema = new Schema({
    amount: {
        type: String,
        required: true,
        min: 0,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2)),
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = budgetSchema;