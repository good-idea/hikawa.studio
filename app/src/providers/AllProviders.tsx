import * as React from 'react'
import { DocumentNode } from 'graphql'
import { ApolloProvider, ApolloClient } from '@apollo/client'
import { SHOPIFY_GRAPHQL_URL, SHOPIFY_STOREFRONT_TOKEN } from '../config'
import { ThemeProvider } from '@xstyled/styled-components'
import { ShopifyProvider } from 'use-shopify'
import { SiteSettingsProvider } from './SiteSettings'
import { defaultTheme, GlobalStyles } from '../theme'
import { Announcement } from '../components/Announcement'
import { NavMenu } from '../components/Navigation'
import { Footer } from '../components/Footer'

interface AllProvidersProps {
  apolloClient: ApolloClient<any>
  children: React.ReactNode
}

const deduplicateFragments = (queryString?: string) =>
  queryString
    ? queryString
        .split(/\n\s+\n/)
        .map((group) => group.replace(/^([\n\s])+/, '').replace(/\n+$/, ''))
        .reduce<string[]>((acc, current) => {
          if (acc.includes(current)) return acc
          return [...acc, current]
        }, [])
        .join('\n\n')
    : ''

async function shopifyQuery<Response>(
  query: string | DocumentNode,
  variables: object,
): Promise<Response> {
  const queryString =
    typeof query === 'string'
      ? query
      : deduplicateFragments(query?.loc?.source.body)
  const result = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: queryString, variables }),
  }).then((r) => r.json())
  return result
}

export const AllProviders = ({ children, apolloClient }: AllProvidersProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ApolloProvider client={apolloClient}>
        <ShopifyProvider query={shopifyQuery}>
          <GlobalStyles />
          <SiteSettingsProvider>
            <Announcement />
            <NavMenu />
            {children}
            <Footer />
          </SiteSettingsProvider>
        </ShopifyProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}
