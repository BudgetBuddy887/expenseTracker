import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me ($orderBy: String) {
    me (orderBy: $orderBy) {
      _id
      username
      email
      expenses{
        _id
        description
        company
        category
        date
        amount
      }
      dashboard{
        sumExpense
        maxExpense
      }
    }
  }
`;
