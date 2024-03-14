const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const spendingSchema = new Schema({
    // User input for what was bought
    description: {
        type: String,      
        required: true,
        trim: true,
    },
    // Number representing money 
    // Set options to limit to 2 decimal places
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    // When purchase made
    // Needs formatting 
    date: {
        type: Date,
    
    },
    // Selection/create new tag to easily identify type of spending
    category: {
        type: String,
        required: true,
        trim: true,
    },
      
});

const Spending = model ('Spending', spendingSchema);

module.exports = Spending;
