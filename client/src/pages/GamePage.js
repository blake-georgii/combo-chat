// import React from 'react';
// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import { REMOVE_GAME } from '../utils/mutations';
// import { GET_ME, GET_ALL_GAMES } from '../utils/queries';
// import { useMutation, useQuery } from '@apollo/client';
// import Auth from '../utils/auth';
// import { removeGameId } from '../utils/localStorage';

// const GamePage = () => {
// //  let userQuery = useQuery(GET_ME);
// //  let gameQuery = useQuery(GET_ALL_GAMES);
// //  const userData = userQuery.data?.me || {};


//  const handleFormSubmit = async (event) => {
//  event.preventDefault();

//  if (!searchInput) {
//  return false;
//   }

//  try {
//    const response = await searchGames(searchInput);

//  if (!response.ok) {
//      throw new Error('something went wrong!');
//     }

//     const items = await response.json();

//    const commentsData = items.results.map((game) => ({
//      gameId: game.id,
//      title: game.name || ['No author to display'],
//      image: game.background_image || '',
// 	// Comments: comments
//    }));

//    setSearchedGames(commentsData);
//     setSearchInput('');
//    } catch (err) {
//     console.error(err);
//    }
//  };

//  function createSavedGamesComments() {
//    let savedGamesList = gameQuery.data.getAllGames.filter(game => {
//      var gameId = game.gameId;
//      let saved = userData.savedGames.some(userGameId => { return userGameId == gameId });
//      return saved;
//    });
//    return savedGamesList;

//  }
//  // if data isn't here yet, say so
//  if (userQuery.loading || gameQuery.loading) {
//    return <h2>LOADING...</h2>;
//  }

//  return (
//    <>
//      <Jumbotron fluid className='text-light bg-dark'>
//        <Container>
//          <h1>Comments Page</h1>

//          {/* <form>
//         <input
//           value={text}
//           onChange={handleChange}
//         />
//         <div >
//           <button
//             onClick={() =>submit()}
//             type='button'
//             disabled={!text}
//           >
//             Post
//           </button>
//             <button onClick={() => handleCancel()}>
//               Cancel
//             </button>
//         </div>
//       </form>) */}


//        </Container>
//      </Jumbotron>
//      <Container>
//        <h2>
//          {userData.savedGames.length
//            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
//            : 'There are no comments yet!'}
//        </h2>
//        <CardColumns>
//          {

//            createSavedGamesComments().map((game) => {
//              return (
//                <Card key={game.gameId} border='dark'>
//                  {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
//                  <Card.Body>
//                    <Card.Title>{game.title}</Card.Title>
//                  </Card.Body>
//                </Card>
//              );
//            })
//          }
//        </CardColumns>
//      </Container>
//    </>
//  );
// };

// export default GamePage;


import React, { useState } from "react"
import { useLocation } from "react-router-dom";
import { GET_ME, GET_ALL_GAMES } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

const GamePage = ({
  cancel,
  parentId,
  value,
  edit,
  submit,
  handleCancel,
}) => {

  const [text, setText] = useState(value)
  const location = useLocation();
  let userQuery = useQuery(GET_ME);
  let gameQuery = useQuery(GET_ALL_GAMES);
  const [addComment] = useMutation(ADD_COMMENT);
  const userData = userQuery.data?.me || {};
  const currentGameId = new URLSearchParams(location.search).get('gameId')

  let game = gameQuery.data.getAllGames.filter(game => { return game.gameId == currentGameId })[0];
  console.log(game);

  const username = userData.username;
  console.log(username);

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleAddComment = async (text) => {
    let gameId = parseInt(game.gameId);
    try {
      await addComment({
        variables: { gameId, text }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (


    <form>
      <h1>Chat Room</h1>

      <input
        value={text}
        onChange={handleChange}
      />
      <div >
        <button
          onClick={() => {
            handleAddComment(text);
          }}
          type='button'
          disabled={!text}
        >
          Post
        </button>
        <button onClick={() => handleCancel(cancel, edit)}>
          Cancel
        </button>
      </div>
    </form>)
}

export default GamePage;


