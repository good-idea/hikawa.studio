import gql from 'graphql-tag'
import { shopifySourceImageFragment, richImageFragment } from './media'

export const seoFragment = gql`
  fragment SEOFragment on Seo {
    name
    description
  }
`

export const heroFragment = gql`
  fragment HeroFragment on Hero {
    _key
    _type
    images {
      _key
      ...RichImageFragment
    }
  }
  ${richImageFragment}
`

export const urlLinkFragment = gql`
  fragment UrlLinkFragment on UrlLink {
    _key
    label
    url
  }
`

export const pageLinkFragment = gql`
  fragment PageLinkFragment on PageLink {
    _type
    _key
    label
    textPreviewRaw
    textOnTop
    fullWidth
    images {
      ...RichImageFragment
    }
    link {
      ... on Shop {
        _type
        title
      }
      ... on Page {
        title
        _type
        slug {
          current
        }
      }
      ... on ShopifyProduct {
        _id
        _type
        shopifyId
        handle
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
      ... on ShopifyCollection {
        _id
        _type
        shopifyId
        handle
        title
        sourceData {
          image {
            ...ShopifySourceImageFragment
          }
        }
      }
      ... on UrlLink {
        _type
        label
        url
      }
    }
  }
  ${shopifySourceImageFragment}
`

export const richTextFragment = gql`
  fragment RichTextFragment on RichText {
    _key
    _type
    blocksRaw
    fullWidth
  }
`

export const colorFragment = gql`
  fragment ColorFragment on Color {
    rgb {
      r
      g
      b
      a
    }
  }
`
