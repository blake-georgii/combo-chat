const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema(
  {
     // saved game id from IGdb
    gameId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
