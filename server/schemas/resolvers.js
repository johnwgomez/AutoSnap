const User = require('../models/User');
const { signToken } = require('../utils/auth');

const Car = require('../models/Car');

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    me: async (_, __, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new Error('Not authenticated');
    },
    getAllCars: async () => {
      return Car.find({});
    },
    getMyCars: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return Car.find({ owner: context.user._id });
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addCar: async (_, { make, model, year }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      const car = await Car.create({ make, model, year, owner: context.user._id });
      return car;
    },
    deleteCar: async (_, { carId }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      const deleted = await Car.findOneAndDelete({ _id: carId, owner: context.user._id });
      return !!deleted;
    },
  },
};

module.exports = resolvers;
