import gql from 'graphql-tag'
import { Homepage } from '../../types'
import {
  seoFragment,
  richTextFragment,
  pageLinkFragment,
  heroFragment,
} from '../../graphql'

export interface HomepageResponse {
  Homepage: Homepage
}

export const homepageQuery = gql`
  query HomepageQuery {
    Homepage(id: "homepage") {
      _id
      _type
      hero {
        ...HeroFragment
      }
      seo {
        ...SEOFragment
      }
      content {
        ... on PageLink {
          ...PageLinkFragment
        }
        ... on RichText {
          ...RichTextFragment
        }
      }
    }
  }
  ${heroFragment}
  ${seoFragment}
  ${pageLinkFragment}
  ${richTextFragment}
`
