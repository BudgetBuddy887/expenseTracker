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


  // type Query {
  //   me: User
  //   expenses: [Expense]
  //   budgets: [Budget]
  // }

