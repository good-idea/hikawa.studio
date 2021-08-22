import * as React from 'react'
import { Heading } from '../Text'
import { CommunityPhotos as CommunityPhotosType } from '../../types'
import { definitely } from '../../utils'
import { CommunityPhotosWrapper } from './styled'
import { ImageGrid } from '../Layout/ImageGrid'
import { CommunityPhoto } from './CommunityPhoto'
import { Carousel } from '../Carousel'

interface CommunityPhotosProps {
  communityPhotos: CommunityPhotosType
}

export const CommunityPhotos: React.FC<CommunityPhotosProps> = ({
  communityPhotos,
}) => {
  const { heading, photos } = communityPhotos
  if (!photos || definitely(photos).length === 0) return null
  return (
    <CommunityPhotosWrapper>
      {heading ? (
        <Heading level={2} fontFamily="sans" textAlign="center">
          {heading}
        </Heading>
      ) : null}
      <Carousel>
        {definitely(photos).map((photo) => (
          <CommunityPhoto key={photo._key} image={photo} />
        ))}
      </Carousel>
    </CommunityPhotosWrapper>
  )
}
