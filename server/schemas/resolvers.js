const { Budget, Expense, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
      const user = await User.create ({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    }
    // addBudget: async (parent, { description, amount, category, createdAt }) => {
    //   return await User.create ({ description, amount, category, createdAt });
    // },
    // updateBudget
    // deleteBudget
    // addExpense: async (parent, { description, amount, expenseDate, category, company, isRecurring, createdAt }) => {
    //   return await User.create ({ description, amount, expenseDate, category, company, isRecurring, createdAt });
    // }
    // updateExpense
    // deleteExpense
  }
};

module.exports = resolvers