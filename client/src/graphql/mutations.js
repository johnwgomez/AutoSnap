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

export const ADD_CAR = gql`
  mutation AddCar($make: String!, $model: String!, $year: Int!, $price: Float!, $description: String!) {
    addCar(make: $make, model: $model, year: $year, price: $price, description: $description) {
      _id
      make
      model
      year
      price
      description
    }
  }
`;
