import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag';

const httpLink = createHttpLink({
  uri: 'https://xr-volunteer-app.herokuapp.com/v1/graphql',
})

const cache = new InMemoryCache()

const typeDefs = gql`
  type FilterEqInt {
    _eq: Int!
  }
  type FilterRoles {
    localGroups: FilterEqInt,
    workingGroups: FilterEqInt,
  }
`

export const apolloClient = new ApolloClient({
  link: httpLink,
  typeDefs,
  resolvers: {},
  cache,
})