const db = require('../config/connection');
const { User, Budget, Expense } = require('../models');
const userSeeds = require('./userSeeds.json');
const budgetSeeds = require('./budgetSeeds.json');
const expenseSeeds = require('./expenseSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('User', 'users');
        // await cleanDB('Budget', 'budgets');
        // await cleanDB('Expense', 'expenses');

        await User.create(userSeeds);
        // await Budget.insertMany(budgetSeeds);
        await Expense.insertMany(expenseSeeds);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("===== DATA SEEDED =====");
    process.exit(0);
});