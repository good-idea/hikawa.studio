import * as React from 'react'
import Head from 'next/head'
import { NextRouter } from 'next/router'
import { AllProviders } from '../src/providers'
import { createApolloClient } from '../src/services'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: NextRouter
}

const App = (props: AppProps) => {
  const { Component, pageProps, router } = props
  const { apolloCache } = pageProps
  const apolloClient = createApolloClient({ initialCache: apolloCache })
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/fonts/fonts.css" />
      </Head>
      <AllProviders apolloClient={apolloClient}>
        <Component {...pageProps} />
      </AllProviders>
    </>
  )
}

export default App
