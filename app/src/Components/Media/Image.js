// @flow
import * as React from 'react'
import type { ImageType } from 'Types/ContentTypes'
import ShopifyImage from './ShopifyImage'
import SanityImage from './SanityImage'

/**
 * Image
 */

type Props = {
	image: ImageType,
	sizes: string,
}

const Image = ({ image, sizes }: Props) => {
	if (!image) return null
	switch (image.__typename) {
		case 'Image':
			return <ShopifyImage image={image} sizes={sizes} />
		case 'SanityImage':
			return <SanityImage image={image} sizes={sizes} />
		default:
			throw new Error(`Image type "${image.__typename}" is not valid`)
	}
}

export default Image
