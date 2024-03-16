const { AuthenticationError } = require('apollo-server-express');
const { User,Expense, Budget } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {

  Query:
  
  {
      
        user: async (_, { id }) => {
          try {
            const user = await User.findById(id).populate('spendings').populate('budgets')
            return user;
          } catch (error) {
            throw new Error('no user');
          }
        },
        
        budget: async (_, { id }) => {
          try {
            const budget = await Budget.findById(id)
            return budget;
          } catch (error) {
            throw new Error(' no budget');
          }
        },
            },

  Mutation: {

    loginUser: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });
    
      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw AuthenticationError
      }
    
      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw AuthenticationError
      }
    
      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);
    
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

   createUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    createSpending: async (_, { description, amount, date, category, userId }) => {
      const spending = await Expense.create({ description, amount, date, category, user: userId });
      await User.findByIdAndUpdate(userId, { $push: { spendings: spending._id } });
      return spending.populate('user');
    },

    deleteSpending: async (_, { spendingId }) => {
      try {
        const deletedSpending = await Expense.findByIdAndDelete(spendingId);
        
        if (deletedSpending) {
          await User.findByIdAndUpdate(
            deletedSpending.user,
            { $pull: { spendings: spendingId } },
            { new: true }
          );
        }
        
        return true;
      } catch (error) {
        throw new Error('Failed to delete spending');
      }
    },

    createBudget: async (_, { description, amount, category, userId }) => {
      const budgetting = await Budget.create({ description, amount, category, user: userId });
      await User.findByIdAndUpdate(userId, { $push: { budgets: budgetting._id } });
      return budgetting.populate('user');
    },

    updateBudget: async (_, { budgetId, amount, category, description }) => {
      const budget = await Budget.findByIdAndUpdate(
        budgetId,
        { amount, category, description },
        { new: true }
      ).populate('user');
      return budget;
    },

 




  },
}
module.exports = resolvers;
