// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ShopifyImage } from 'Types/MediaTypes'
import { ImageBox } from 'Components/Media'

const Wrapper = styled.button`
	position: relative;
`

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
		<ImageBox ration={1} image={image} />
	</Wrapper>
)

export default MyComponent
