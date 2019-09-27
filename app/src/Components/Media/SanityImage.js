// @flow
import React from 'react'
import type { SanityImage as SanityImageType } from 'Types/MediaTypes'
import { buildSrcSet } from 'Utils/sanity'

/**
 * SanityImage
 */

type Props = {
	image: SanityImageType,
	sizes?: string,
}

const SanityImage = ({ image, sizes }: Props) => {
	const srcset = buildSrcSet(image)
	return <img src={image.url} alt={image.altText || ''} srcSet={srcset} sizes={sizes} />
}

SanityImage.defaultProps = {
	sizes: '100vw',
}

export default SanityImage
