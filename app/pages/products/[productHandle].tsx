import * as React from 'react'
import gql from 'graphql-tag'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ShopifyProduct } from '../../src/types'
import { definitely } from '../../src/utils'
import { ssrClient, App, ProductView } from '../../src/views'

interface ProductProps {
  handle: string
}

const Product = ({ handle }) => {
  return <ProductView key={handle} handle={handle} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const productHandle = ctx.params?.productHandle
  const handle = Array.isArray(productHandle) ? productHandle[0] : productHandle
  if (!handle) throw new Error('No product handle was provided')
  const StaticApp = (
    <App>
      <ProductView key={handle} handle={handle} />
    </App>
  )

  await getDataFromTree(StaticApp)
  const apolloCache = ssrClient.extract()
  return { props: { apolloCache, handle: productHandle }, revalidate: 60 }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query ProductHandlesQuery {
    allShopifyProduct(
      where: { shopifyId: { neq: null }, archived: { neq: true } }
    ) {
      archived
      _id
      shopifyId
      handle
    }
  }
`

interface ProductResponse {
  allShopifyProduct: ShopifyProduct[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await ssrClient.query<ProductResponse>({
    query: pageHandlesQuery,
  })

  const products = definitely(result?.data?.allShopifyProduct)
  products.forEach((product) => {
    if (!product?.shopifyId)
      throw new Error('This product does not have a shopifyId')
  })
  // const paths = products.map((product) => ({
  //   params: { productHandle: product.handle ? product.handle : undefined },
  // }))

  return {
    paths: [],
    fallback: false,
  }
}

export default Product
