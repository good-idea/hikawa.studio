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
        textRaw
        backgroundColor {
          ...ColorFragment
        }
        link {
          ...PageLinkFragment
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
