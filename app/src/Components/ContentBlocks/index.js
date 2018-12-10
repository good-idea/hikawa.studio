// @flow
import type { ContentBlock } from 'Types/ContentTypes'
import React from 'react'
// import Gallery from './Gallery'
import Text from './Text'
// import Image from './Image'
// import Animation from './Animation'
import Video from './Video'
import Header from './Header'
import PageLink from './PageLink'

/**
 * Block
 */

type Props = {
	block: ContentBlock,
	number: number,
}

const Block = ({ block, number }: Props) => {
	// PageLinks to shopifyItems that no longer exist will return `link: null`
	if (block._type === 'pageLink' && !block.link) return null
	switch (block._type) {
		// case 'gallery':
		// 	return <Gallery {...block} />
		// case 'image':
		// 	return <Image {...block} />
		case 'videoEmbed':
			return <Video {...block} />
		case 'richText':
			return <Text {...block} />
		case 'header':
			return <Header {...block} />
		case 'pageLink':
			return <PageLink number={number} item={block} imageSizes="450px" />
		default:
			throw new Error(`There is no content component for "${block._type}"`)
	}
}

export default Block
