 const {gql} = require('apollo-server-express');

 // typeDefs
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        budgets: [Budget]
        expenses: [Expense]
        dashboard: Dashboard
    }

    type Budget {
        _id: ID!
        amount: Float!
        category:String
        description: String
        user: User!
    }

    type Expense {
        _id: ID!
        description: String!
        amount: Float!
        date: String!
        company: String!
        category: String!
        user: User!
    }

    input ExpenseInput {
        id: ID
        description: String!
        amount: Float!
        date: String!
        category: String!
        company: String!
    }
   
    input BudgetInput {
        id: ID
        description: String
        amount: Float!
        category:String
        
    }

    type Auth {
        token: ID!
        user: User
    }

    type Dashboard {
        sumExpense: Float
        maxExpense: Float
    }

    type Query {
        me(orderBy:String):User
        userData : User
        getAllBudgetData(_id: ID!): [Budget]
        getAllExpenseData(_id: ID!): [Expense] 
    }

    type Mutation {
        login(email:String!, password:String!): Auth
        addUser(username:String!, email:String!, password:String!): Auth
        
        createExpense(expenseData: ExpenseInput!): User
        updateExpense(expenseData: ExpenseInput!): User
        deleteExpense(expenseId: String!): Expense


        createBudget(budgetData: BudgetInput!): User
        updateBudget(budgetData: BudgetInput!): User
        deleteBudget(budgetId: String!): Budget


    }`;

    module.exports = typeDefs; 
    
    
  