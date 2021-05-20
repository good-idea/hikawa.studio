import gql from 'graphql-tag'
import { SiteSettings } from '../../types'
import {
  pageLinkFragment,
  urlLinkFragment,
  colorFragment,
  richImageFragment,
  seoFragment,
  ctaFragment,
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
            ...CTAFragment
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
  ${ctaFragment}
  ${urlLinkFragment}
`

export interface SiteSettingsResponse {
  SiteSettings: SiteSettings
}
