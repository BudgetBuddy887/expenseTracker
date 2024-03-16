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

// export const LOGIN_USER = gql`
//   mutation loginUser($email: String!, $password: String!) {
//     loginUser(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

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
// }`;

// export const ADD_EXPENSE = gql`
//   mutation createSpending($input: ExpenseInput!) {
//     createSpending(input: $input) {
//       _id
//     }
//   }
// `;

// export const UPDATE_EXPENSES = gql`
//   mutation saveBook($input: BookInput!) {
//     saveBook(input: $input) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;


// export const REMOVE_REMOVE = gql`
//   mutation removeBook($bookId: ID!) {
//     removeBook(bookId: $bookId) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;


// export const ADD_BUDGET = gql`
//   mutation saveBook($input: BookInput!) {
//     saveBook(input: $input) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;

// export const UPDATE_BUDGET = gql`
//   mutation saveBook($input: BookInput!) {
//     saveBook(input: $input) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
// `;


// export const REMOVE_BUDGET = gql`
//   mutation removeBook($bookId: ID!) {
//     removeBook(bookId: $bookId) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         authors
//         description
//         title
//         image
//         link
//       }
//     }
//   }
//`;

