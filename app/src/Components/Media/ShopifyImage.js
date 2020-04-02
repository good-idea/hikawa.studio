// @flow
import React from 'react'
import styled from 'styled-components'
import type { ShopifyImage as ShopifyImageType } from 'Types/MediaTypes'

/**
 * ShopifyImage
 */

type Props = {
	image: ShopifyImageType,
	sizes?: string,
}

export const buildSrcSet = (image: ShopifyImageType): string => {
	const { w100, w300, w600, w800, w1000, w1200, w1400, w1800 } = image
	return `${w100} 100w, ${w300} 300w, ${w600} 600w, ${w800} 800w, ${w1000} 1000w, ${w1200} 1200w, ${w1400} 1400w, ${w1800} 1800w`
}

const ShopifyImage = (props: Props) => {
	const { image, sizes } = props
	const srcSet = buildSrcSet(image)
	return <img sizes={sizes} src={image.originalSrc} srcSet={srcSet} alt={image.altText} />
}

ShopifyImage.defaultProps = {
	sizes: '100vw',
}

export default ShopifyImage
