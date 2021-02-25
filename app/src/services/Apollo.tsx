import {
  ApolloClientOptions,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

interface Props extends Omit<ApolloClientOptions<any>, 'cache'> {
  initialCache?: any
}

export const createApolloClient = (props?: Props) =>
  new ApolloClient({
    cache: new InMemoryCache().restore(props?.initialCache || {}),
    ...props,
  })
