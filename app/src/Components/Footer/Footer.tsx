import * as React from 'react'
import Link from 'next/link'
import { PageLink } from '../../types'
import { Heading } from '../Text'
import { RichText } from '../RichText'
import { MailerForm } from '../Mailer'
import { definitely, getLinkUrl, getLinkLabel } from '../../utils'
import { useSiteSettings } from '../../providers'
import { Wrapper, FooterLinkWrapper, FooterSection } from './styled'

/**
 * Footer
 */

interface FooterLinkProps {
  pageLink: PageLink
}

const FooterLink = ({ pageLink }: FooterLinkProps) => {
  const link = pageLink.link ? pageLink.link[0] : null
  if (!link) return null
  const label = pageLink.label || getLinkLabel(link)
  if (link.__typename === 'UrlLink') {
    if (!link.url) return null
    return (
      <Heading level={4}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Heading>
    )
  }
  const { href, as } = getLinkUrl(link)
  return (
    <Heading level={4}>
      <Link href={href} as={as}>
        <a>{label}</a>
      </Link>
    </Heading>
  )

  return null
}

export const Footer = () => {
  const { siteSettings } = useSiteSettings()
  const { mailer } = siteSettings
  const footer = siteSettings?.navigation?.footer
  const links = footer ? definitely(footer.links) : []
  return (
    <Wrapper>
      {footer && footer.textRaw ? (
        <FooterSection>
          <RichText body={footer.textRaw} />
        </FooterSection>
      ) : null}
      <FooterSection>
        {links.map((link) => (
          <FooterLinkWrapper key={link._key || 'some-key'}>
            <FooterLink pageLink={link} />
          </FooterLinkWrapper>
        ))}
      </FooterSection>
      {mailer ? (
        <FooterSection>
          <RichText body={mailer.footerTextRaw} />
          <MailerForm />
        </FooterSection>
      ) : null}
    </Wrapper>
  )
}
