const { Schema, model } = require('mongoose');

const budgetSchema = new Schema({
    // Set outgoing money goal
    // Option to limit to 2 decimal places
    amount: {
        type: Number,
        required: true,
    },
    // Selection/create new tag to easily identify type of spending
    category: {
        type: String,
    },
   description: {
        type: String,
    },
});

const Budget = model('Budget', budgetSchema);

module.exports = Budget;