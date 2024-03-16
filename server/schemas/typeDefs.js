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

  type Category {
    _id: ID!
    category: String!
  }

  type Expense {
    _id: ID!
    description: String!
    amount: Float!
    expenseDate: Date!
    category: Category!
    company: String!
    isRecurring: Boolean!
    createdAt: Date!
  }

  type Budget {
    _id: ID!
    description: String!
    amount: Float!
    category: Category!
    createdAt: Date!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    user: [User]
    category: [Category]
    expense: [Expense]
    budget: [Budget]
    auth: [Auth]
  }

  type Mutation {
    addUser(username:String!, email:String!, password:String!): Auth
    login(email: String!, password: String!): Auth

  }

`;

module.exports = typeDefs;
