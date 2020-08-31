import gql from 'graphql-tag'

export const shopifySourceImageFragment = gql`
  fragment ShopifySourceImageFragment on ShopifySourceImage {
    __typename
    id
    altText
    originalSrc
    w100
    w300
    w800
    w1200
    w1600
  }
`

export const shopifyImageFragment = gql`
  fragment ShopifyImageFragment on Image {
    __typename
    id
    altText
    originalSrc
    w100: transformedSrc(maxWidth: 100)
    w300: transformedSrc(maxWidth: 300)
    w800: transformedSrc(maxWidth: 800)
    w1200: transformedSrc(maxWidth: 1200)
    w1600: transformedSrc(maxWidth: 1600)
  }
`

export const sanityImageAssetFragment = gql`
  fragment SanityImageAssetFragment on SanityImageAsset {
    __typename
    _id
    _type
    _key
    label
    extension
    path
    url
    metadata {
      dimensions {
        height
        width
        aspectRatio
      }
    }
  }
`

export const sanityImageFragment = gql`
  fragment SanityImageFragment on Image {
    __typename
    _type
    asset {
      ...SanityImageAssetFragment
    }
    hotspot {
      __typename
      _key
      _type
      x
      y
      height
      width
    }
    crop {
      __typename
      _key
      _type
      top
      bottom
      left
      right
    }
  }
  ${sanityImageAssetFragment}
`

export const richImageFragment = gql`
  fragment RichImageFragment on RichImage {
    __typename
    _type
    altText
    asset {
      ...SanityImageAssetFragment
    }
    hotspot {
      __typename
      _key
      _type
      x
      y
      height
      width
    }
    crop {
      __typename
      _key
      _type
      top
      bottom
      left
      right
    }
  }
  ${sanityImageAssetFragment}
`
