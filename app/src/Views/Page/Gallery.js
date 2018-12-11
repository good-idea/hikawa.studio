// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SanityImage as SanityImageType } from 'Types/MediaTypes'
import SanityImage from 'Components/Media/SanityImage'

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
	images: Array<SanityImageType>,
}

const Gallery = ({ images }: Props) => {
	return (
		<Grid>
			{images.map((image) => (
				<ImageWrapper key={image.url}>
					<SanityImage image={image} sizes="50vw" />
				</ImageWrapper>
			))}
		</Grid>
	)
}

export default Gallery
