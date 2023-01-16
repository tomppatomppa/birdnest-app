import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: 'https://birdnest-api.herokuapp.com/',
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://birdnest-api.herokuapp.com/',
    })
  )
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  })
}

export default createApolloClient
