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
                  {userData.savedBooks.length
                    ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
                    : 'You have no saved books!'}
                </h2>
                <CardColumns>
                  {userData.savedBooks.map((book) => {
                    return (
                      <Card key={book.bookId} border='dark'>
                        {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                        <Card.Body>
                          <Card.Title>{book.title}</Card.Title>
                          <p className='small'>Authors: {book.authors}</p>
                          <Card.Text>{book.description}</Card.Text>
                          <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                            Delete this Book!
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