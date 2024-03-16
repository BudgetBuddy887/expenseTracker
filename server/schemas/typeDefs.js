const typeDefs = `
scalar Date

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  budgets: [Budget]
  spendings: [Spending]
}

type Budget {
  _id: ID!
  amount: Float!
  category: String!
  description: String
  user: User!
}

type Spending {
  _id: ID!
  description: String!
  amount: Float!
  date: Date!
  category: String!
  user: User!
}

type Auth {
  token: ID!
  user: User!
}

type Query {
  user(id: ID!): User
  budget(id: ID!): Budget
  spending(id: ID!): Spending
  userBudgets(userId: ID!): [Budget]
  userSpendings(userId: ID!): [Spending]
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  loginUser(email: String!, password: String!): Auth
  
  createBudget(amount: Float!, category: String!, description: String, userId: ID!): Budget

  updateBudget(budgetId: ID!, amount: Float, category: String, description: String): Budget

  deleteBudget(budgetId: ID!): Boolean

  createSpending(description: String!, amount: Float!, date: String!, category: String!, userId: ID!): Spending

  updateSpending(spendingId: ID!, description: String, amount: Float, date: String, category: String): Spending
  deleteSpending(spendingId: ID!): Boolean
}

`;
module.exports = typeDefs;
