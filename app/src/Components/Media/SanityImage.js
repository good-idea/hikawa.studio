// @flow
import React from 'react'
import type { SanityImage as SanityImageType } from 'Types/MediaTypes'

/**
 * SanityImage
 */

type Props = {
	image: SanityImageType,
}

const SanityImage = ({ image }: Props) => {
	return <img src={image.url} />
}

export default SanityImage
