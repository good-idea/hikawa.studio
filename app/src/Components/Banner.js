// @flow
import React from 'react'
import styled from 'styled-components'

const Figure = styled.figure`
	width: 100%;
	position: relative;
	max-height: 70vh;
	overflow: hidden;
	margin: ${({ theme }) => theme.layout.spacing.double} 0;
`

const PaddingRatio = styled.div`
	width: 100%;
	padding-bottom: 56%;
`

const Image = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	object-fit: cover;
`

/**
 * Banner
 */

type Props = {
	src: string,
	alt: string,
}

const Banner = ({ src, alt }: Props) => {
	return (
		<Figure>
			<PaddingRatio />
			<Image src={src} alt={alt} />
		</Figure>
	)
}

export default Banner
