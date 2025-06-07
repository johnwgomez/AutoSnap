// client/src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_MY_CARS = gql`
  query GetMyCars {
    getMyCars {
      _id
      make
      model
      year
      price
      description
      image
    }
  }
`;
