import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      expenses{
        _id
        description
        company
        category
        createdAt
        amount
      }
    }
  }
`;
