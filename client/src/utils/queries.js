import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me ($orderBy: String) {
    me (orderBy: $orderBy) {
      _id
      username
      email
      
      budgets {
        _id
        amount
        category
        description
      }
      expenses {
        _id
        description
        amount
        date
        company
        category
      }
      dashboard{
        sumExpense
        maxExpense
        sumBudget
      }
    }
  }
`;
