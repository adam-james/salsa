import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Moves from './components/moves'

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphql'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Moves />
      </div>
    </ApolloProvider>
  );
}

export default App;
