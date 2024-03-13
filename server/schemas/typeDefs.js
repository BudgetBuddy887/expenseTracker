const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    phone: String!
    addressLine1: String
    addressLine2: String
    addressLine3: String
    city: String
    postcode: String
    county: String
    country: String
    userType: UserType!
    expenses: [Expense]
    budgets: [Budget]
    createdAt: Date!
  }

  type UserType {
    _id: ID!
    userType: String!
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

  type Mutation {
    addUser(username:String!, email:String!, password:String!): Auth
  }

`;

module.exports = typeDefs;
