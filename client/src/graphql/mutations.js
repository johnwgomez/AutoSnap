// client/src/graphql/mutations.js
import { gql } from '@apollo/client';

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

export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $make: String!
    $model: String!
    $year: Int!
    $price: Int!
    $description: String!
    $image: String
  ) {
    addCar(
      make: $make
      model: $model
      year: $year
      price: $price
      description: $description
      image: $image
    ) {
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
