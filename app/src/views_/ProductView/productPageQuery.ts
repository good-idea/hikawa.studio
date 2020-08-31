import gql from 'graphql-tag'
import {
  seoFragment,
  heroFragment,
  shopifySourceImageFragment,
} from '../../graphql'
import { ShopifyProduct } from '../../types'

export interface ProductQueryResponse {
  allShopifyProduct: ShopifyProduct[]
}

export interface ProductQueryInput {
  handle: string
}

export const productPageQuery = gql`
  query ProductPageQuery($handle: String) {
    allShopifyProduct(where: { handle: { eq: $handle } }) {
      _id
      handle
      shopifyId
      archived
      title
      minVariantPrice
      maxVariantPrice
      hero {
        ...HeroFragment
      }
      seo {
        ...SEOFragment
      }
      collections {
        _key
        handle
        title
        products {
          _key
          _id
          handle
          shopifyId
          title
          sourceData {
            images {
              edges {
                node {
                  ...ShopifySourceImageFragment
                }
              }
            }
          }
        }
      }
      sourceData {
        description
        descriptionHtml
        availableForSale
        images {
          edges {
            node {
              ...ShopifySourceImageFragment
            }
          }
        }
        variants {
          edges {
            node {
              id
              availableForSale
              priceV2 {
                amount
              }
              sku
              title
              image {
                ...ShopifySourceImageFragment
              }
            }
          }
        }
      }
    }
  }
  ${shopifySourceImageFragment}
  ${seoFragment}
  ${heroFragment}
`
