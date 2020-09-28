import gql from 'graphql-tag'
import { SiteSettings } from '../../types'
import {
  pageLinkFragment,
  urlLinkFragment,
  colorFragment,
  richImageFragment,
  seoFragment,
} from '../../graphql'

export const siteSettingsQuery = gql`
  query SiteSettingsQuery {
    SiteSettings(id: "site-settings") {
      _id
      _type
      highlight {
        ...ColorFragment
      }
      checkout {
        textRaw
      }
      announcement {
        enabled
        announcements {
          bodyRaw
          cta {
            label
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
        }
        backgroundColor {
          ...ColorFragment
        }
      }
      logo {
        ...RichImageFragment
      }
      mailer {
        buttonLabel
        footerTextRaw
        popupTextRaw
        popupEnabled
        popupBackground {
          ...RichImageFragment
        }
      }
      instagram {
        title
        handle
        images {
          _key
          ...RichImageFragment
        }
      }
      product {
        textRaw
      }
      navigation {
        header {
          links {
            ... on PageLink {
              ...PageLinkFragment
            }
            ... on UrlLink {
              ...UrlLinkFragment
            }
          }
        }
        footer {
          textRaw
          links {
            ... on PageLink {
              ...PageLinkFragment
            }
          }
        }
      }
      seo {
        ...SEOFragment
      }
    }
  }
  ${richImageFragment}
  ${colorFragment}
  ${pageLinkFragment}
  ${seoFragment}
  ${urlLinkFragment}
`

export interface SiteSettingsResponse {
  SiteSettings: SiteSettings
}
