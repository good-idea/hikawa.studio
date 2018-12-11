// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SanityImage as SanityImageType } from 'Types/MediaTypes'
import SanityImage from 'Components/Media/SanityImage'

/**
 * Gallery
 */

const ImageWrapper = styled.div`
	${({ theme }) => `
		margin-bottom: ${theme.layout.spacing.single};
	`}
`

type Props = {
	images: Array<SanityImageType>,
}

const Gallery = ({ images }: Props) => {
	return (
		<React.Fragment>
			{images.map((image) => (
				<ImageWrapper key={image.url}>
					<SanityImage image={image} sizes="100vw" />
				</ImageWrapper>
			))}
		</React.Fragment>
	)
}

export default Gallery
