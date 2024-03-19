const { AuthenticationError } = require('apollo-server-express');
const { User, Expense,Budget } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user.username) {
        console.log(context.user.username);
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('expenses').populate('budgets');
        console.log(userData);
        return userData;
      }
      console.log('Use is logged out or has not logged in');
      throw new AuthenticationError('Not logged in');
    },

    userData: async (parent, args, context) => {
      try {
        if (context.user.username) {
          console.log('Get user data : ' + context.user._id);
          const userData = await User.findById(context.user._id).populate('expenses').populate('budgets')
          console.log('Get user data : ' + JSON.stringify(user));
          return userData;
        }
      } catch (error) {
        throw new Error('no user');
      }
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
         
          const expense = await Expense.create(expenseData);
          // console.log(JSON.stringify(expense));

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
    },

    createBudget: async (parent, {budgetData}, context) => {
      try{
        console.log("checking", context.user.username)
        if (context.user.username) {
          console.log("checking inside the if ", context.user.username)
       
          const budget = await Budget.create(budgetData);
          console.log(JSON.stringify(budget));
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id  },
            { $addToSet: {budgets: budget._id } },
            { new: true }
          );
          console.log('Budget Added Successfully :' + JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
      catch (err) {console.log('Error while adding budgets: ' + err);}
    },

    updateBudget: async (parent, {budgetData}, context) => {
      try{
        if (context.user.username) {
          console.log(context.user._id);
          console.log(JSON.stringify(budgetData));
          const budget = await Budget.updateOne(
            { _id: budgetData.id},
            {
              description: budgetData.description,
              category: budgetData.category,
              amount: budgetData.amount
            }
          );
          console.log("Updated budget : " + JSON.stringify(budget));
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id  },
          );
          console.log('Budget updated successfully :' + JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
      catch (err) {console.log('Error while adding budget: ' + err);}
    },


    deleteBudget : async(parent, {budgetId}, context) =>{
      try{
        
        if(context.user.username){
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id  },
            { $pull: { budgets: budgetId } },
            { new: true }
          );
          
        }
        return updatedUser;
      } catch (err) {
        console.log('Error while deleting expense: ' + budgetId + ' : ' + err);
      }
    },

  },
}
module.exports = resolvers;

