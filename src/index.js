import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { ApolloProvider } from '@apollo/client'

import createApolloClient from './apolloClient'

const client = createApolloClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
