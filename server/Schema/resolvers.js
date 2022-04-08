const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        console.log('me query called')
        const user = await User.findOne({
          _id: context.user._id
        });

        return user
      }

      throw new AuthenticationError('Not Logged In')
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        throw new AuthenticationError('Something Went Wrong')
      }
      const token = signToken(user);
      return { token, user };
    },
    addGame: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGames: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('User Not Logged In')
    },
    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: { GameId: GameId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new AuthenticationError("Couldn't find user with that Id")
        }
        return updatedUser;
      }
    }
  }
};

module.exports = resolvers;