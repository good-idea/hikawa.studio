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
	largeText?: boolean,
}

const Block = ({ block, number, largeText }: Props) => {
	// PageLinks to shopifyItems that no longer exist will return `link: null`
	if (block._type === 'pageLink' && !block.link) return null
	const contentBlock =
		block._type === 'pageLink'
			? {
					...block,
					// $FlowFixMe
					images: block.images ? block.images.filter((i) => Boolean(i._ref)) : null,
			  }
			: block
	switch (block._type) {
		// case 'gallery':
		// 	return <Gallery {...block} />
		// case 'image':
		// 	return <Image {...block} />
		case 'videoEmbed':
			return <Video {...contentBlock} />
		case 'richText':
			return <Text {...contentBlock} />
		case 'header':
			return <Header {...contentBlock} />
		case 'pageLink':
			return (
				<PageLink
					largeText={largeText}
					number={number}
					item={contentBlock}
					imageSizes={`(min-width: 600px) 90vw, ${contentBlock.fullWidth ? 'calc(100vw - 80px)' : '450px'}`}
				/>
			)
		default:
			throw new Error(`There is no content component for "${contentBlock._type}"`)
	}
}

Block.defaultProps = {
	largeText: false,
}

export default Block
