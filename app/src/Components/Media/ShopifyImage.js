// @flow
import React from 'react'
import type { ShopifyImage as ShopifyImageType } from 'Types/MediaTypes'

/**
 * ShopifyImage
 */

type Props = {
	image: ShopifyImageType,
}

const ShopifyImage = (props: Props) => {
	const { image } = props
	return <img src={image.originalSrc} alt={image.altText} />
}

export default ShopifyImage
