const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema(
  {
    authors: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    // saved game id from IGdb
    gameId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('gameCount').get(function () {
  return this.savedGames.length;
});

const Game = model('Game', gameSchema);

module.exports = Game, gameSchema;
