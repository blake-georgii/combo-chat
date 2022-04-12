import { gql } from '@apollo/client';

export const GET_ME = gql`
{
  me {
    _id
    username
    email
    savedGames
  }
}
`;

export const GET_ALL_GAMES = gql`
{
  getAllGames {
    gameId
    image
    title
    comments{
      user
      text
    }
  }
}
`;
