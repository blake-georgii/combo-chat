// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save game data for a logged in user
export const saveGame = (gameData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gameData),
  });
};

// remove saved game data for a logged in user
export const deleteGame = (gameId, token) => {
  return fetch(`/api/users/games/${gameId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const searchGames = (query) => {
  // return fetch(`https://www.googleapis.com/games/v1/volumes?q=${query}`);
  return fetch(`https://api.rawg.io/api/games?search=${query}&key=${process.env.REACT_APP_RAWG_KEY}
  `);
};

