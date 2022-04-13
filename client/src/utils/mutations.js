import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_GAME_TO_LIST = gql`
  mutation addGameToList(
    $gameId: Int!
  ) {
    addGameToList(
      savedGames: $gameId
    ) {
      _id
      username
      email
      savedGames
    }
  }
`;

export const ADD_GAME_TO_DB = gql`
mutation addGameToDB(
  $gameId: Int!
  $title: String!
  $image: String
) {
  addGameToDB(
    gameId: $gameId
    title: $title
    image: $image
  ) {
    gameId
    title
    image
  }
}`;


export const REMOVE_GAME = gql`
mutation removeGame($gameId: String!) {
  removeGame(gameId: $gameId) {
    _id
    username
    gameCount
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment(
  $gameId: Int!
  $text: String!
) {
  addComment(
    gameId: $gameId
    text: $text
  ) {
    gameId
    title
    image
    comments{
      user
      text
    }
  }
}
`;
