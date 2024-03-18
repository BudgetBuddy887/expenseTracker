import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense($expenseData: ExpenseInput!) {
    createExpense(expenseData: $expenseData) {
      _id
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($expenseData: ExpenseInput!) {
    updateExpense(expenseData: $expenseData) {
      _id
    }
  }
`;


export const DELETE_EXPENSE = gql`
  mutation deleteExpense($expenseId: String!) {
    deleteExpense(expenseId: $expenseId) {
      _id
    }
  }
`;



// export const CREATE_USER = gql`
// mutation createUser($email: String!, $password: String!, $username: String!) {
//   createUser(email: $email, password: $password, username: $username) {
//     token
//     user {
//       _id
//       username
//       email
//       password
//     }
//   }
// }`

// export const ADD_EXPENSE = gql`
//   mutation createSpending($input: ExpenseInput!) {
//     createSpending(input: $input) {
//       _id
//     }
//   }
// `;



