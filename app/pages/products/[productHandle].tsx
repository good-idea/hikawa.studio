import * as React from 'react'
import gql from 'graphql-tag'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ShopifyProduct } from '../../src/types'
import { getParam, definitely } from '../../src/utils'
import { Sentry } from '../../src/services/sentry'
import { ssrClient, App, ProductView } from '../../src/views'

interface ProductProps {
  handle: string
}

const Product = ({ handle }: ProductProps) => {
  return <ProductView key={handle} handle={handle} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const { params } = ctx

    if (!params?.productHandle) {
      throw new Error('No product handle was provided')
    }
    const handle = getParam(params.productHandle)
    if (!handle) throw new Error('No product handle was provided')
    const StaticApp = (
      <App>
        <ProductView key={handle} handle={handle} />
      </App>
    )

    await getDataFromTree(StaticApp)
    const apolloCache = ssrClient.extract()
    return { props: { apolloCache, handle }, revalidate: 60 }
  } catch (e) {
    Sentry.captureException(e)
    return { props: {}, revalidate: 1 }
  }
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
  const paths = products.map((product) => ({
    params: { productHandle: product.handle ? product.handle : undefined },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Product
