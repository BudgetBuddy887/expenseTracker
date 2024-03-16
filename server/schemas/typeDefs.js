const {gql} = require('apollo-server-express');

const typeDefs = gql`

  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    expenses: [Expense]
    budgets: [Budget]
    createdAt: Date!
  }

  type Expense {
    _id: ID!
    description: String!
    amount: Float!
    expenseDate: Date!
    company: String!
    isRecurring: Boolean!
    createdAt: Date!
  }

  type Budget {
    _id: ID!
    description: String!
    amount: Float!
    createdAt: Date!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    user: [User]
    expense: [Expense]
    budget: [Budget]
    auth: [Auth]
  }

  type Mutation {
    addUser(username:String!, email:String!, password:String!): Auth
    login(email: String!, password: String!): Auth
    addBudget (budgetId: ID!, description: String!, amount: Float!, createdAt: Date!): Budget
    updateBudget(budgetId: ID!, description: String, amount: Float, createdAt: Date): Budget
    deleteBudget(budgetId: ID!): Budget
    addExpense(expenseId: ID!, 
      description: String!,
      amount: Float!
      expenseDate: Date!
      company: String!
      isRecurring: Boolean!
      createdAt: Date!): Expense
    updateExpense(expenseId: ID!, 
      description: String,
      amount: Float
      expenseDate: Date
      company: String
      isRecurring: Boolean
      createdAt: Date): Expense
    deleteExpense(expenseId: ID!): Expense
  }

`;

module.exports = typeDefs;
