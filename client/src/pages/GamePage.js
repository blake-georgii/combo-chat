import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client'

const GamePage = () => {
    // const [ loading, data ]=useQuery();
    // const userData = data?.me || {}

    // if(loading) {
    //     return <h2>Loading...</h2>
    // }

        return (
            <>
              <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                  {/* <h1>Viewing `${gameData.name}`</h1> */}
                </Container>
              </Jumbotron>
              <Container>
                <h2>
                  {userData.savedGames.length
                    ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
                    : 'You have no saved games!'}
                </h2>
                <CardColumns>
                  {userData.savedGames.map((game) => {
                    return (
                      <Card key={game.gameId} border='dark'>
                        {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                        <Card.Body>
                          <Card.Title>{game.title}</Card.Title>
                          <p className='small'>Studio: {game.studios}</p>
                          <Card.Text>{game.description}</Card.Text>
                          <Button className='btn-block btn-danger' onClick={() => handleDeletegame(game.gameId)}>
                            Delete this game!
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </CardColumns>
              </Container>
            </>
          );
        };