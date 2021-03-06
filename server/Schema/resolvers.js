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
    },

    getAllGames: async (parent, args, context) => {
      console.log('game query called');
      var game = await Game.find({});
      return game;
    },
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

    addGameToDB: async (parent, args, context) => {

      const currentGames = await Game.find();
      const currentGameIds = currentGames.map(game => { return game.gameId });
      if (currentGameIds.every(id => {return id != args.gameId}) ){
        const game = await Game.create(args);
        console.log(game);
        return game;
      }
      return -1;
      
    },

    addGameToList: async (parent, args, context) => {
      console.log();
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGames: args.savedGames } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser);
        return updatedUser;
      }

      throw new AuthenticationError('User Not Logged In')
    },

    removeGameFromList: async (parent, { gameId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: gameId } },
          { new: true }
        );
        if (!updatedUser) {
          throw new AuthenticationError("Couldn't find user with that Id")
        }
        return updatedUser;
      }
    },

    addComment: async (parent, { gameId, text }, context) => {
      if (context.user) {
        const updatedGame = await Game.findOneAndUpdate(
          { gameId: gameId },
          {
            $push: {
              comments: {
                user: context.user.username,
                text: text
              }
            }
          },
        );
        console.log(updatedGame);
        if (!updatedGame) {
          throw new AuthenticationError("Couldn't find user with that Id")
        }
        return updatedGame;
      }
    }
  }
};

module.exports = resolvers;