import * as React from 'react'
import Head from 'next/head'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { NextRouter } from 'next/router'
import { AllProviders, gtmScript } from '../src/providers'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: NextRouter
}

const SANITY_GRAPHQL_URL = process.env.SANITY_GRAPHQL_URL
const SHOPIFY_GRAPHQL_URL = process.env.SHOPIFY_GRAPHQL_URL
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN

if (!SANITY_GRAPHQL_URL)
  throw new Error('You must provide a SANITY_GRAPHQL_URL')
if (!SHOPIFY_GRAPHQL_URL)
  throw new Error('You must provide a SHOPIFY_GRAPHQL_URL')
if (!SHOPIFY_STOREFRONT_TOKEN)
  throw new Error('You must provide a SHOPIFY_STOREFRONT_TOKEN')

const App = (props: AppProps) => {
  const { Component, pageProps, router } = props
  const { apolloCache } = pageProps
  const apolloClient = new ApolloClient({
    uri: SANITY_GRAPHQL_URL,
    cache: new InMemoryCache().restore(apolloCache || {}),
  })

  const shopifyApolloClient = new ApolloClient({
    uri: SHOPIFY_GRAPHQL_URL,
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
  })
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
        <link rel="icon" href="/static/images/hikawa_favicon.png" />
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=VLZgNL"
        />
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=VLZgNL"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <script
          /* Tag Manager */
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: gtmScript.script }}
        />
      </Head>
      <AllProviders
        shopifyApolloClient={shopifyApolloClient}
        apolloClient={apolloClient}
      >
        <Component {...pageProps} />
      </AllProviders>
      <noscript>
        <iframe
          src={gtmScript.iframeSrc}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  )
}

export default App
