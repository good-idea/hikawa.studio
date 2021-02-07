import gql from 'graphql-tag'
import { Shop } from '../../types'
import {
  heroFragment,
  seoFragment,
  colorFragment,
  shopifySourceImageFragment,
  shopifySourceProductVariantFragment,
} from '../../graphql'

export interface ShopPageResponse {
  Shop: Shop
}

export const shopPageQuery = /* GraphQL */ gql`
  query ShopQuery {
    Shop(id: "shop") {
      hero {
        ...HeroFragment
      }
      seo {
        ...SEOFragment
      }
      collections {
        _id
        title
        handle
        backgroundColor {
          ...ColorFragment
        }
        keyColor {
          ...ColorFragment
        }
        products {
          _id
          title
          handle
          sourceData {
            title
            id
            tags
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
    }
  }
  ${heroFragment}
  ${seoFragment}
  ${shopifySourceImageFragment}
  ${colorFragment}
  ${shopifySourceProductVariantFragment}
`
