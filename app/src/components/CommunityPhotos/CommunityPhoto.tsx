import * as React from 'react'
import { Heading } from '../Text'
import { RichImage } from '../../types'
import { Image } from '../Image'
import { CommunityPhotoWrapper } from './styled'

interface CommunityPhotoProps {
  image: RichImage
}

export const CommunityPhoto: React.FC<CommunityPhotoProps> = ({ image }) => {
  const { credit } = image
  const href = credit
    ? `https://www.instagram.com/${credit.replace(/^@/, '')}`
    : null

  return (
    <CommunityPhotoWrapper>
      {href ? (
        <a
          key={image?._key || 'some-key'}
          target="_blank"
          rel="noreferrer noopener"
          href={href}
        >
          <Image sizes="300px" ratio={1} image={image} />
          <Heading fontWeight={2} level={5}>
            {credit}
          </Heading>
        </a>
      ) : (
        <Image sizes="300px" ratio={1} image={image} />
      )}
    </CommunityPhotoWrapper>
  )
}
