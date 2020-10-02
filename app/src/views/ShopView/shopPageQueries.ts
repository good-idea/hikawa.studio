import gql from 'graphql-tag'
import { Shop } from '../../types'
import {
  heroFragment,
  seoFragment,
  colorFragment,
  shopifySourceImageFragment,
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
            tags
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
`
