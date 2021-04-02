import gql from 'graphql-tag'
import {
  seoFragment,
  heroFragment,
  shopifySourceImageFragment,
  shopifySourceProductVariantFragment,
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
      klaviyoFormID
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
            title
            id
            variants {
              edges {
                node {
                  ...ShopifySourceProductVariantFragment
                }
              }
            }

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
        title
        id
        images {
          edges {
            node {
              ...ShopifySourceImageFragment
            }
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
        variants {
          edges {
            node {
              id
              availableForSale
              title
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
  ${shopifySourceProductVariantFragment}
`
