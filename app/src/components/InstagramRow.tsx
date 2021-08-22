import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useSiteSettings } from '../providers'
import { ImageGrid } from './Layout/ImageGrid'
import { Image } from './Image'
import { Heading } from './Text'
import { InstagramLogo } from './InstagramLogo'
import { definitely } from '../utils'

/**
 * Instagram
 */

const Wrapper = styled.div`
  margin: 6 0;
`

export const InstagramRow = () => {
  const { siteSettings } = useSiteSettings()
  if (!siteSettings?.instagram) return null
  const { title, images, handle } = siteSettings.instagram
  if (!images || !images.length) return null
  return (
    <Wrapper>
      {title && (
        <Heading level={2} fontFamily="sans" textAlign="center">
          <InstagramLogo />
          {title}
        </Heading>
      )}
      <ImageGrid limit={true}>
        {definitely(images).map((image) => (
          <a
            key={image?._key || 'some-key'}
            target="_blank"
            rel="noreferrer noopener"
            href={`https://www.instagram.com/${handle}`}
          >
            <Image sizes="300px" ratio={1} image={image} />
          </a>
        ))}
      </ImageGrid>
      <Heading level={4} textAlign="center">
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://www.instagram.com/${handle}`}
        >{`@${handle}`}</a>
      </Heading>
    </Wrapper>
  )
}
