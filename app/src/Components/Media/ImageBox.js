// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ImageType } from 'Types/ContentTypes'
import Image from './Image'

const Figure = styled.figure`
	width: 100%;
	position: relative;
	max-height: 70vh;
	overflow: hidden;
`

const PaddingRatio = styled.div`
	${({ pBottom }) => `
		width: 100%;
		padding-bottom: ${pBottom};
	`};
`

const ImageWrapper = styled.div`
	& > img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
	}
`

/**
 * ImageBox
 */

type Props = {
	ratio?: number,
	image: ImageType,
	children?: React.Node,
}

const ImageBox = ({ image, ratio, children }: Props) => {
	const pBottom = `${100 * (ratio || 1)}%`
	return (
		<Figure>
			<PaddingRatio pBottom={pBottom} />
			<ImageWrapper>
				<Image image={image} />
				{children || null}
			</ImageWrapper>
		</Figure>
	)
}

ImageBox.defaultProps = {
	ratio: 1,
	children: null,
}

export default ImageBox
