import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Routes from './routes'

const client = new ApolloClient({
  uri: 'http://localhost:4000/api/graphql'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes />
      </div>
    </ApolloProvider>
  );
}

export default App;
