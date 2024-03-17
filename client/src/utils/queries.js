import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me  {
    me {
        _id
        username
        email
        expenses
        budget
    }
  }

`;

export const QUERY_USER_DATA = gql`
  query getUserData {
    userData {
        _id
        username
        email
        expenses
        budgets
    }
  }

`;

