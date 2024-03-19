const { AuthenticationError } = require('apollo-server-express');
const { User, Expense, UserData } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try{
        if (context.user.username) {
          console.log(context.user.username);
          let sum = 0;
          let max = 0;
          const user = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('expenses');
          if(user.expenses.length > 0){
            user.expenses.map((expense) => { sum = sum + expense.amount });
            user.expenses.map((expense) => { if(expense.amount > max) {max = expense.amount} });
          }
          user.dashboard.sumExpense = sum;
          user.dashboard.maxExpense = max;
          console.log(user);
          return user;
        }
        console.log('Use is logged out or has not logged in');
        throw new AuthenticationError('Not logged in');
      }catch(err){console.log(err)}
    },

    getAllBudgetData: async (parent, args, context) => {
      try {
        if (context.user._id) {
          console.log(`Get budget data from ${_id}`);
          const budgetData = await Budget.findById(context.user._id).populate('budgets')
          console.log('Get budget data : ' + JSON.stringify(budget));
          return budgetData;
        }
      } catch (error) {
        throw new Error('Problem retrieving budget');
      }
    },

    getAllExpenseData: async (parent, args, context) => {
      try {
        if (context.user._id) {
          console.log(`Get expense data from ${_id}`);
          const expenseData = await Expense.findById(context.user._id).populate('expenses')
          console.log('Get expense data : ' + JSON.stringify(expense));
          return expenseData;
        }
      } catch (error) {
        throw new Error('Problem retrieving expenses');
      }
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
      console.log("Logging token " + JSON.stringify(token));
      return { token, user };
    },

    createExpense: async (parent, {expenseData}, context) => {
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

    updateExpense: async (parent, {expenseData}, context) => {
      try{
        if (context.user.username) {
          console.log(context.user._id);
          console.log(JSON.stringify(expenseData));
          const expense = await Expense.updateOne(
            { _id: expenseData.id},
            {
              description: expenseData.description,
              category: expenseData.category,
              company: expenseData.company,
              date: expenseData.date,
              amount: expenseData.amount
            }
          );
          console.log("Updated expense : " + JSON.stringify(expense));
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id  },
          );
          console.log('Expense updated successfully :' + JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
      catch (err) {console.log('Error while adding expense: ' + err);}
    },
    
    deleteExpense : async(parent, {expenseId}, context) =>{
      try{
        console.log('Deleting expense : ' + expenseId);
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        console.log('Expense deleted : ' + deletedExpense);
        if(deletedExpense){
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id  },
            { $pull: { expenses: expenseId } },
            { new: true }
          );
          console.log("Updated user after expense id " + expenseId + " is deleted: " + updatedUser);
        }
        return deletedExpense;
      } catch (err) {
        console.log('Error while deleting expense: ' + expenseId + ' : ' + err);
      }
    }
  },
};

module.exports = resolvers;


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


