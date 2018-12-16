// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SanityImage } from 'Types/MediaTypes'
import { Image } from 'Components/Media'

const HeroWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 30vh;
	max-height: 85vh;
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
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`
// object-fit: contain;

/**
 * Hero
 */
type Props = {
	images: Array<SanityImage>,
	view?: 'carousel' | 'standard',
}

const Hero = ({ images, view }: Props) =>
	images && images.length ? (
		<HeroWrapper view={view}>
			{images.map((image, index) => (
				<ImageWrapper key={image.url} index={index}>
					<Image image={image} sizes="100vw" />
				</ImageWrapper>
			))}
		</HeroWrapper>
	) : null

Hero.defaultProps = {
	view: 'standard',
}
export default Hero
