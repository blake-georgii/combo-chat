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
    $gameId: String!
  ) {
    addGameToList(
      gameId: $gameId
    ) {
      _id
      username
      email
      savedGames {
        gameId
      }
    }
  }
`;

export const ADD_GAME_TO_DB = gql`
mutation addGameToDB(
  $gameId: String!
  $title: String!
  $image: String
  $link: String
  $author: [String]
  $description: String!
) {
  addGame(
    gameId: $gameId
    title: $title
    image: $image
    link: $link
    author: $author
    description: $description
  ) {
    gameId
    authors
    description
    image
    link
    title
    comments
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


