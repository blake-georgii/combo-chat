import { gql } from '@apollo/client';

export const GET_ME = gql`
{
  me {
    _id
    username
    email
    gameCount
    savedGames {
        gameId
        title
        author
        description
        image
        link
    }
  }
}
`;
