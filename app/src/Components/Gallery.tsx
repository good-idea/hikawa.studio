import * as React from 'react'
import styled from '@xstyled/styled-components'
import { RichImage } from '../types'
import { Image } from './Image'

const Grid = styled.div`
  ${({ theme }) => `
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: ${theme.layout.spacing.single};
	`}
`

const ImageWrapper = styled.div`
  ${({ theme }) => `
		margin-bottom: ${theme.layout.spacing.single};
	`}
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
