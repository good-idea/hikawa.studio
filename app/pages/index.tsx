import * as React from 'react'
import { GetStaticProps } from 'next'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ssrClient, App, HomepageView } from '../src/views'

const Homepage = () => {
  return <HomepageView />
}

export const getStaticProps: GetStaticProps = async () => {
  const StaticApp = (
    <App>
      <HomepageView />
    </App>
  )

  await getDataFromTree(StaticApp)
  const apolloCache = ssrClient.extract()

  return { props: { apolloCache } }
}

export default Homepage
