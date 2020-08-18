import React from 'react'
import styled from '@xstyled/styled-components'
import Link from 'next/link'
import { useSiteSettings } from '../providers'
import { Image } from './Image'

const LogoWrapper = styled.div`
  width: 100%;
  a {
    width: 100%;
  }
`

export const Logo = () => {
  const { siteSettings } = useSiteSettings()
  const { logo, seo } = siteSettings
  if (!logo) return null
  return (
    <LogoWrapper>
      <Link href="/">
        <a>
          <Image image={logo} altText={seo?.name} sizes="300px" />
        </a>
      </Link>
    </LogoWrapper>
  )
}
