import * as React from 'react'
import { Heading } from '../Text'
import { RichImage } from '../../types'
import { Image } from '../Image'
import { CommunityPhotoWrapper, Handle } from './styled'

interface CommunityPhotoProps {
  image: RichImage
}

export const CommunityPhoto: React.FC<CommunityPhotoProps> = ({ image }) => {
  const { credit } = image
  return (
    <CommunityPhotoWrapper>
      <Image sizes="300px" ratio={1} image={image} preload={true} />
      {credit ? <Handle>{credit}</Handle> : null}
    </CommunityPhotoWrapper>
  )
}
