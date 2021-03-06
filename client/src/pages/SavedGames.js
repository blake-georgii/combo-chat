import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { REMOVE_GAME } from '../utils/mutations';
import { GET_ME, GET_ALL_GAMES } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const SavedGames = () => {
  let userQuery = useQuery(GET_ME);
  let gameQuery = useQuery(GET_ALL_GAMES);
  const [removeGame] = useMutation(REMOVE_GAME)
  const userData = userQuery.data?.me || {};
  
  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGame({
        variables: { gameId: gameId }
      });

      // upon success, remove game's id from localStorage
      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  function createSavedGamesList() {
    let savedGamesList = gameQuery.data.getAllGames.filter(game => {
      var gameId = game.gameId;
      let saved = userData.savedGames.some(userGameId => { return userGameId == gameId });
      return saved;
    });
    
    return savedGamesList;

  }
  // if data isn't here yet, say so
  if (userQuery.loading || gameQuery.loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved games!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <CardColumns>
          {
            
            createSavedGamesList().map((game) => {
              return (
                <Card key={game.gameId} border='dark'>
                  {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <Button className='btn-block btn-primary' as={Link} to={{pathname:"/comments",search: `?gameId=${game.gameId}`}}>
                      Chat About This Game!
                    </Button>
                    {/* <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.gameId)}>
                      Delete this Game!
                    </Button> */}
                  </Card.Body>
                </Card>
              );
            })


          }
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedGames;