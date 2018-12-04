// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ShopifyImage } from 'Types/MediaTypes'
import { Image } from 'Components/Media'

const Wrapper = styled.button`
	${() => `
		position: relative;
	`};
`
// padding: ${theme.layout.spacing.half};

/**
 * MyComponent
 */

type Props = {
	onClick: () => void,
	image: ShopifyImage,
	isCurrentImage: boolean,
}

const MyComponent = ({ onClick, image, isCurrentImage }: Props) => (
	<Wrapper isCurrentImage={isCurrentImage} onClick={onClick}>
		<Image image={image} />
	</Wrapper>
)

export default MyComponent
