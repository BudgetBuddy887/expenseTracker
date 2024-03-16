const { Budget, Expense, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
      user: async () => {
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
    },
    addBudget: async (parent, { description, amount, createdAt }) => {
      return await User.create ({ description, amount, createdAt });
    },
    updateBudget: async (parent, { budgetId, editedBudget }, context) => {
      if (context.user) {
        const updatedBudgetItem = await Budget.findOneAndUpdate(
          { _id: budgetId, budgetUser: context.user.username },
          { $set: editedBudget },
          { new: true }
        );
        return updatedBudgetItem
      }
      throw AuthenticationError
    },
    deleteBudget: async (parent, { budgetId }, context) => {
      if (context.user) {
        const budgetItem = await Budget.findOneAndDelete({
          _id: budgetId,
          budgetUser: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { budget: budgetItem._id } }
        );
        return budgetItem
      }
      throw AuthenticationError
    },
    addExpense: async (parent, { description, amount, expenseDate, company, isRecurring, createdAt }) => {
      return await User.create ({ description, amount, expenseDate, company, isRecurring, createdAt });
    },
    updateExpense: async (parent, { expenseId, editedExpense }, context) => {
      if (context.user) {
        const updatedExpenseItem = await Expense.findOneAndUpdate(
          { _id: expenseId, expenseUser: context.user.username },
          { $set: editedExpense },
          { new: true }
        );
        return updatedExpenseItem
      }
      throw AuthenticationError
    },
    deleteExpense: async (parent, { expenseId }, context) => {
      if (context.user) {
        const expenseItem = await Expense.findOneAndDelete({
          _id: expenseId,
          expenseUser: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: {budget: expenseItem._id } }
        );
        return expenseItem
      }
      throw AuthenticationError
    }
  }
};

module.exports = resolvers