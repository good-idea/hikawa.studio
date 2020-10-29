import * as React from 'react'
import { GetStaticProps } from 'next'
import { HomepageView } from '../src/views'
import { getApolloCache } from '../src/utils/ssr'

const Homepage = () => {
  return <HomepageView />
}

export const getStaticProps: GetStaticProps = async () => {
  const { apolloCache } = await getApolloCache(HomepageView)

  return { props: { apolloCache }, revalidate: 60 }
}

export default Homepage
