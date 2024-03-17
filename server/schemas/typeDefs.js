 const {gql} = require('apollo-server-express');

 // typeDefs
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        budgets: [Budget]
        expense: [Expense]
    }

    type Budget {
        _id: ID!
        amount: Float!
        category: String!
        description: String
        user: User!
    }

    type Expense {
        _id: ID!
        description: String!
        amount: Float!
        date: String!
        category: String!
        user: User!
    }

    input ExpenseInput {
        description: String!
        amount: Float!
        date: String!
        category: String!
        company: String!
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me:User
    }

    type Mutation {
        login(email:String!, password:String!): Auth
        addUser(username:String!, email:String!, password:String!): Auth
        createExpense(expenseData: ExpenseInput!): User
    }`;

    module.exports = typeDefs;