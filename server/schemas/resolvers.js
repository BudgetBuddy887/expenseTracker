const { AuthenticationError } = require('apollo-server-express');
const { User, Expense } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user.username) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }
      console.log('Use is logged out or has not logged in');
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      try{
        console.log(username + " " + email + " " + password);
        const user = await User.create({username, email, password});
        console.log("User created " + JSON.stringify(user));
        const token = signToken(user);
        console.log("Sign up token " + JSON.stringify(token));
        return { token, user };
      } catch (err) {
        console.error(err);
      }
      
    },

    login: async (parent, { email, password }) => {
      console.log(email + " " + password);
      const user = await User.findOne({ email });
      console.log("found user : " + JSON.stringify(user));
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      console.log("Loging token " + JSON.stringify(token));
      return { token, user };
    },

    createSpending: async (parent, {expenseData}, context) => {
      try{
        if (context.user.username) {
          console.log(context.user._id);
          console.log(JSON.stringify(expenseData));
          const expense = await Expense.create(expenseData);
          console.log(JSON.stringify(expense));
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id  },
            { $addToSet: { expenses: expense._id } },
            { new: true }
          );
          console.log('Expense Added Successfully :' + JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
      catch (err) {console.log('Error while adding expense: ' + err);}
    },
  },
};

module.exports = resolvers;