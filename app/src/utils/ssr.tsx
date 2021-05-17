import * as React from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { AllProviders } from '../providers'
import { createApolloClient } from '../services'
import { config } from '../config'

interface AppProps {
  children: React.ReactNode
  ssrClient: ApolloClient<any>
}

export const createSSRClient = () =>
  createApolloClient({
    uri: config.sanity.graphQLurl,
    ssrMode: true,
  })

export const shopifyApolloClient = createApolloClient({
  uri: config.shopify.graphQLurl,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': config.shopify.accessToken,
  },
})

const StaticApp = ({ children, ssrClient }: AppProps) => {
  return (
    <AllProviders
      shopifyApolloClient={shopifyApolloClient}
      apolloClient={ssrClient}
    >
      {children}
    </AllProviders>
  )
}

interface SSRProps {
  apolloCache: NormalizedCacheObject
}

type ReactFnComponent = (props: any) => JSX.Element | null

export const getApolloCache = async (
  View: React.ComponentType | ReactFnComponent,
  viewProps: Record<string, any> = {},
): Promise<SSRProps> => {
  const ssrClient = createSSRClient()
  await ssrClient.cache.reset()

  const RenderedApp = (
    <StaticApp ssrClient={ssrClient}>
      <View {...viewProps} />
    </StaticApp>
  )

  await getDataFromTree(RenderedApp)
  const apolloCache = ssrClient.extract()
  return { apolloCache }
}
