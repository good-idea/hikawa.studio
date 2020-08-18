import { ApolloClient, InMemoryCache } from '@apollo/client'

interface Props {
  initialCache?: any
}

export const createApolloClient = (props?: Props) =>
  new ApolloClient({
    uri: 'https://7afit9ut.api.sanity.io/v1/graphql/production/default',
    cache: new InMemoryCache().restore(props?.initialCache || {}),
  })
