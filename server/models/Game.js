const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
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

const Game = model('Game', gameSchema);

module.exports = Game, gameSchema;
