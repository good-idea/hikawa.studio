import gql from 'graphql-tag'
import { richImageFragment, heroFragment, seoFragment } from '../../graphql'
import { Page } from '../../types'

export const pageQuery = gql`
  query PageQuery($slug: String!) {
    allPage(where: { slug: { current: { eq: $slug } } }) {
      title
      slug {
        current
      }
      hero {
        ...HeroFragment
      }
      seo {
        ...SEOFragment
      }
      includeInstagram
      contentRaw
      gallery {
        ...RichImageFragment
      }
    }
  }
  ${richImageFragment}
  ${heroFragment}
  ${seoFragment}
`

export interface PageResponse {
  allPage: Page[]
}

export interface PageArgs {
  slug: string
}
