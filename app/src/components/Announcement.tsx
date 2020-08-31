import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { AnnouncementSettings } from '../types'
import { sanityColorToRGBA } from '../utils'
import { useSiteSettings } from '../providers'
import { RichText } from './RichText'
import { Heading } from './Text'

const { useState } = React

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
    padding: 0 45px;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

interface State {
  open: boolean
}

const AnnouncementTextWrapper = (props: any) => (
  <Heading family="sans" weight={5} level={5} {...props} />
)

export const Announcement = () => {
  const { siteSettings } = useSiteSettings()
  const { announcement } = siteSettings
  if (!announcement) return null
  const { enabled, textRaw } = announcement
  const [open, setOpen] = useState<boolean>(Boolean(enabled))
  const closeMenu = () => setOpen(false)
  return (
    <AnnouncementWrapper open={open} announcement={announcement}>
      <RichText
        body={textRaw}
        blockWrapper={AnnouncementTextWrapper}
        weight={5}
      />
      <CloseButton onClick={closeMenu} />
    </AnnouncementWrapper>
  )
}
