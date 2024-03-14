const { Budget, Expense, User } = require('../models');

const resolvers = {
  Query: {
      user: async () => {
        return db.user
        // return await User.find({}).populate
      },
      category: async () => {
        return db.user
        // return await User.find({}).populate
      },
      expense: async () => {
        return db.user
        // return await User.find({}).populate
      },
      budget: async () => {
        return db.user
        // return await User.find({}).populate
      },
      auth: async () => {
        return db.user
        // return await User.find({}).populate
      },
    },
    Mutation: {
    addUser: async (parent, { username, email, password }) => {
     return await User.create ({ username, email, password });
    },
    // updateUserName(parent.args){
    //   const {id, }
    // },
    // addBudget
    // updateBudget
    // deleteBudget
    // addExpense
    // updateExpense
    // deleteExpense
  }
};

module.exports = resolvers