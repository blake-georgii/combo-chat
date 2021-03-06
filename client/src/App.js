import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchGames from './pages/SearchGames';
import SavedGames from './pages/SavedGames';
import Navbar from './components/Navbar';
import GamePage from './pages/GamePage';


//create link to the graphql server using proxy in package.json
const httpLink = createHttpLink({
  uri: '/graphql',
});

//add authorization to header for context in resolvers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//establish a new connection to the apollo server and new memory cache for queries
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchGames} />
          <Route exact path='/saved' component={SavedGames} />
          <Route exact path='/comments' component={GamePage} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
