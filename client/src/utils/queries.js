import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;


  type Query {
    me: User
    expenses: [Expense]
    budgets: [Budget]
  }

