const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const dashboardSchema = new Schema({
    sumExpense: Float,
    maxExpense: Float,
    sumBudget: Float
});

const Dashboard = model('UserData', dashboardSchema);

module.exports = Dashboard;
