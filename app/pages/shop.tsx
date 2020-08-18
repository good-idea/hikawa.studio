import * as React from 'react'
import { GetStaticProps } from 'next'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ssrClient, App, ShopView } from '../src/views'

const Shop = () => {
  return <ShopView />
}

export const getStaticProps: GetStaticProps = async () => {
  const StaticApp = (
    <App>
      <ShopView />
    </App>
  )

  await getDataFromTree(StaticApp)
  const apolloCache = ssrClient.extract()

  return { props: { apolloCache } }
}

export default Shop
