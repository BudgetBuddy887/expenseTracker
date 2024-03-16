// const { AuthenticationError } = require('apollo-server-express');
// const { User,Expense, Budget } = require('../models');
// const { signToken } = require('../utils/auth');


// const resolvers = {
//   Query:
//   {
//     user: async (_, { id }) => {
//       try {
//         const user = await User.findById(id).populate('spendings').populate('budgets')
//         return user;
//       } catch (error) {
//         throw new Error('no user');
//       }
//     },
        
//     budget: async (_, { id }) => {
//       try {
//         const budget = await Budget.findById(id)
//         return budget;
//       } catch (error) {
//         throw new Error(' no budget');
//       }
//     },
//   },

//   Mutation: {

//     loginUser: async (parent, { email, password }) => {
//       // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
//       const user = await User.findOne({ email });
    
//       // If there is no user with that email address, return an Authentication error stating so
//       if (!user) {
//         throw AuthenticationError
//       }
    
//       // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
//       const correctPw = await user.isCorrectPassword(password);
    
//       // If the password is incorrect, return an Authentication error stating so
//       if (!correctPw) {
//         throw AuthenticationError
//       }
    
//       // If email and password are correct, sign user into the application with a JWT
//       const token = signToken(user);
    
//       // Return an `Auth` object that consists of the signed token and user's information
//       return { token, user };
//     },

//    createUser: async (parent, { username, email, password }) => {
//       // First we create the user
//       const user = await User.create({ username, email, password });
//       // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
//       const token = signToken(user);
//       // Return an `Auth` object that consists of the signed token and user's information
//       return { token, user };
//     },

//     createSpending: async (parent, {expenseData}, context) => {
//       if (context.user.username) {
//         const updatedUser = await User.findByIdAndUpdate(
//           { _id: context.user._id  },
//           { $push: { spendings: expenseData } },
//           { new: true }
//         );
//           console.log('Expense Added Successfully');
//         return updatedUser;
//       }
//     },

//     deleteSpending: async (_, { spendingId }) => {
//       try {
//         const deletedSpending = await Expense.findByIdAndDelete(spendingId);
        
//         if (deletedSpending) {
//           await User.findByIdAndUpdate(
//             deletedSpending.user,
//             { $pull: { spendings: spendingId } },
//             { new: true }
//           );
//         }
        
//         return true;
//       } catch (error) {
//         throw new Error('Failed to delete spending');
//       }
//     },

//     createBudget: async (_, { description, amount, category, userId }) => {
//       const budgetting = await Budget.create({ description, amount, category, user: userId });
//       await User.findByIdAndUpdate(userId, { $push: { budgets: budgetting._id } });
//       return budgetting.populate('user');
//     },

//     updateBudget: async (_, { budgetId, amount, category, description }) => {
//       const budget = await Budget.findByIdAndUpdate(
//         budgetId,
//         { amount, category, description },
//         { new: true }
//       ).populate('user');
//       return budget;
//     },
//   },
// }
// module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
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
    
    saveBook: async (parent, {bookData}, context) => {
      console.log('Saving');
      console.log(context.user.username);
      if (context.user.username) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id  },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
          console.log('Server saved the book ' + bookData.title + ' for ' + context.user.username);
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user.username) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
