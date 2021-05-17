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
      }
    }
  }
  ${colorFragment}
  ${ctaFragment}
`

export interface SiteSettingsResponse {
  SiteSettings: SiteSettings
}
