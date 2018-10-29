// @flow
import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../../services/sanity'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
	return builder.image(source)
}

/**
 * Image
 */

const Image = (props: Props) => {
	const src = urlFor(props.asset).url()
	return <img src={src} />
}

export default Image
