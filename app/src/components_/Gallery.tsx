import * as React from 'react'
import styled from '@xstyled/styled-components'
import { RichImage } from '../types'
import { Image } from './Image'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3;
`

const ImageWrapper = styled.div`
  margin-bottom: 3;
`

/**
 * Gallery
 */

type Props = {
  images: RichImage[]
}

export const Gallery = ({ images }: Props) => {
  return (
    <Grid>
      {images.map((image) => (
        <ImageWrapper key={image._key}>
          <Image image={image} sizes="50vw" />
        </ImageWrapper>
      ))}
    </Grid>
  )
}
