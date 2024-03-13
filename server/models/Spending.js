const { Schema, model } = require('mongoose');

const spendingSchema = new Schema({
    // User input for what was bought
    description: {
        type: String,
    },
    // Number representing money 
    // Set options to limit to 2 decimal places
    amount: {
        type: Number,
        required: "How much did you spend?",
    },
    // When purchase made
    // Needs formatting 
    date: {
        type: Date,
    },
    // Selection/create new tag to easily identify type of spending
    category: {
        type: String,
    },
    // Who did you pay money to?
    location: {
        type: String,
    }
});

const Spending = model ('Spending', spendingSchema);

module.exports = Spending;