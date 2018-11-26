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
}

const Image = ({ image }: Props) => {
	if (!image) return null
	switch (image.__typename) {
		case 'Image':
			return <ShopifyImage image={image} />
		case 'SanityImage':
			return <SanityImage image={image} />
		default:
			throw new Error(`Image type "${image.__typename}" is not a valid`)
	}
}

export default Image
