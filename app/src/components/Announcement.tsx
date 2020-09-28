import * as React from 'react'
import Link from 'next/link'
import styled, { css } from '@xstyled/styled-components'
import { Cta as CTAType, AnnouncementSettings } from '../types'
import { sanityColorToRGBA } from '../utils'
import { useSiteSettings } from '../providers'
import { RichText } from './RichText'
import { Heading } from './Text'
import { getLinkLabel, getLinkUrl } from '../utils'

const { useState, useEffect } = React

interface AnnouncementWrapperProps {
  open: boolean
  announcement: AnnouncementSettings
}

const AnnouncementWrapper = styled.div<AnnouncementWrapperProps>`
  ${({ theme, announcement, open }) => css`
    background-color: ${announcement.backgroundColor
      ? sanityColorToRGBA(announcement.backgroundColor)
      : 'pink'};
    color: ${announcement.textColor
      ? sanityColorToRGBA(announcement.textColor)
      : 'black'};
    position: relative;
    width: 100%;
    overflow: hidden;
    transform-origin: 0 50%;
    height: ${open ? theme.announcementHeight : '0'};
    transition: 0.3s ease-out;
    text-align: center;
    font-size: 6;
    font-weight: 4;
    text-align: center;

    a {
      text-decoration: underline;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0 auto;
    }
  `}
`

interface WithVisible {
  visible: boolean
}

const AnnouncementInner = styled.div<WithVisible>`
  ${({ visible }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition-delay: ${visible ? '0.4s' : '0s'};
  `}
`

const CloseButton = styled.button`
  position: absolute;
  top: calc(50% - 8px);
  right: 20px;
  width: 16px;
  height: 16px;
  background-color: transparent;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: -15%;
    height: 2px;
    width: 130%;
    background-color: currentColor;
  }

  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
`

/**
 * Announcement
 */

const AnnouncementTextWrapper = (props: any) => (
  <Heading family="sans" weight={5} level={5} {...props} />
)

interface CTAProps {
  cta?: CTAType | null
}

const CTA = ({ cta }: CTAProps) => {
  if (!cta?.link || cta.link.length === 0) return null

  const link = cta.link[0]
  if (!link) return null
  const defaultLabel = getLinkLabel(link)
  const { href, as } = getLinkUrl(link)

  const { label: customLabel } = cta
  const label = customLabel || defaultLabel

  if (!label) return null
  return (
    <Heading level={5} color="pink" my={0}>
      <Link href={href} as={as}>
        <a>{label}</a>
      </Link>
    </Heading>
  )
}

const TIME = 4500

export const Announcement = () => {
  const { siteSettings } = useSiteSettings()
  const { announcement } = siteSettings
  const { enabled } = announcement || {}
  const [open, setOpen] = useState<boolean>(Boolean(enabled))
  const [currentAnnouncement, setCurrentAnnouncement] = useState<number>(0)
  const closeMenu = () => setOpen(false)
  const { announcements } = announcement || {}
  if (!announcements?.length) return null

  useEffect(() => {
    if (announcements.length < 1) return
    const tm = setTimeout(() => {
      setCurrentAnnouncement((currentAnnouncement + 1) % announcements.length)
    }, TIME)
    return () => clearTimeout(tm)
  }, [currentAnnouncement])

  return (
    <AnnouncementWrapper open={open} announcement={announcement}>
      {announcements.map((a, index) =>
        a && a.bodyRaw ? (
          <AnnouncementInner
            key={index}
            visible={index === currentAnnouncement}
          >
            <RichText
              body={a.bodyRaw}
              blockWrapper={AnnouncementTextWrapper}
              weight={5}
            />
            {a.cta ? <CTA cta={a.cta} /> : null}
          </AnnouncementInner>
        ) : null,
      )}
      <CloseButton onClick={closeMenu} />
    </AnnouncementWrapper>
  )
}
