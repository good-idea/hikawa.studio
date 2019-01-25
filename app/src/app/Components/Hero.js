// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { SanityImage } from 'Types/MediaTypes'
import { Image } from 'Components/Media'

const HeroWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	padding-bottom: 45%;
`

const EmptyHero = styled.div`
	${({ theme }) => css`
		height: 100px;
		background: whitemoke;

		${theme.media.queries.phone`
		height: 30px;
	`}
	`}
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
	hero?: {
		images: Array<SanityImage>,
	},
	view?: 'carousel' | 'standard',
}

const Hero = ({ hero, view }: Props) =>
	hero && hero.images && hero.images.length ? (
		<HeroWrapper view={view}>
			{hero.images.map((image, index) => (
				<ImageWrapper key={image.url} index={index}>
					<Image image={image} sizes="100vw" />
				</ImageWrapper>
			))}
		</HeroWrapper>
	) : (
		<EmptyHero />
	)

Hero.defaultProps = {
	view: 'standard',
	hero: {
		images: [],
	},
}
export default Hero
