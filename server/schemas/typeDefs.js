// server/schemas/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Car {
    _id: ID
    make: String
    model: String
    year: Int
    price: Int!
    description: String
    image: String       # <-- only one image field here
    owner: User
  }

  type Query {
    hello: String
    me: User

    getAllCars: [Car]
    getMyCars: [Car]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth

    addCar(
      make: String!
      model: String!
      year: Int!
      price: Int!
      description: String!
      image: String       # <-- only one addCar definition
    ): Car

    deleteCar(carId: ID!): Boolean
  }
`;

module.exports = typeDefs;
