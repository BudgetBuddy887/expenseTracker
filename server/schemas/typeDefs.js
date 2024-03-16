 const {gql} = require('apollo-server-express');

 // typeDefs
const typeDefs = gql`
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
        amount: String!
        category: String!
        description: String
        user: User!
    }

    type Spending {
        _id: ID!
        description: String!
        amount: String!
        date: String!
        category: String!
        user: User!
    }

    input ExpenseInput {
        description: String!
        amount: String!
        date: String!
        category: String!
        company: String!
    }
    
    type Book{
        bookId: String
        authors: [String],
        description: String!
        title: String!
        image: String
        link: String
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
        createSpending(expenseData: ExpenseInput!): User
    }`;

    module.exports = typeDefs;