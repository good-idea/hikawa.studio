// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SanityImage } from 'Types/MediaTypes'
import { Image } from 'Components/Media'

const HeroWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	max-height: 70vh;
	height: 100%;
`

const ImageWrapper = styled.div`
	${({ index }) => `
		position: absolute;
		top: 0;
		left: calc(100% * ${index});
		width: 100%;
		height: 100%;
		object-fit: cover;

	`};
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-fit: contain;
	}
`

/**
 * Hero
 */
type Props = {
	images: Array<SanityImage>,
}
const Hero = ({ images }: Props) => (
	<HeroWrapper>
		{images.map((image, index) => (
			<ImageWrapper key={image.url} index={index}>
				<Image image={image} />
			</ImageWrapper>
		))}
	</HeroWrapper>
)

export default Hero
