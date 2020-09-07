import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ShopifyCollection } from '../../src/types'
import { ssrClient, App, ShopView } from '../../src/views'
import { getParam, definitely } from '../../src/utils'

interface ShopProps {
  activeCollectionHandle: string
}

const Shop = ({ activeCollectionHandle }: ShopProps) => {
  return (
    <ShopView
      key={activeCollectionHandle}
      activeCollectionHandle={activeCollectionHandle}
    />
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.collectionHandle) {
    throw new Error('No product handle was provided')
  }

  const handle = getParam(params?.collectionHandle)
  if (!handle) throw new Error('No collection handle was provided')

  const StaticApp = (
    <App>
      <ShopView activeCollectionHandle={handle} />
    </App>
  )

  await getDataFromTree(StaticApp)
  const apolloCache = ssrClient.extract()

  return {
    props: { activeCollectionHandle: handle, apolloCache },
    revalidate: 60,
  }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query ProductHandlesQuery {
    allShopifyCollection(
      where: { shopifyId: { neq: null }, archived: { neq: true } }
    ) {
      archived
      _id
      shopifyId
      handle
    }
  }
`

interface CollectionsResponse {
  allShopifyCollection: ShopifyCollection[]
}

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const result = await ssrClient.query<CollectionsResponse>({
    query: pageHandlesQuery,
  })

  const collections = definitely(result?.data?.allShopifyCollection)

  const paths = collections
    .filter((collection) => Boolean(collection.handle))
    .map((collection) => ({ params: { collectionHandle: collection.handle } }))

  return {
    paths,
    fallback: true,
  }
}

export default Shop
