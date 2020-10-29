import * as React from 'react'
import { GetStaticProps } from 'next'
import { ShopView } from '../../src/views'
import { getApolloCache } from '../../src/utils/ssr'

const Shop = () => {
  return <ShopView />
}

export const getStaticProps: GetStaticProps = async () => {
  const { apolloCache } = await getApolloCache(ShopView)
  return { props: { apolloCache }, revalidate: 60 }
}

export default Shop
