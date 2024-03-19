const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const budgetSchema = new Schema({
     amount: {
        type: Number,
        required: true,
        min: 0,
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2)),
    },
    category: {
        type: String,
        
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
       
    },
});
const Budget = model('Budget', budgetSchema);
module.exports = Budget;