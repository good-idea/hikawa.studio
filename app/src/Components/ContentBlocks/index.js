// @flow
import type { ContentBlock } from 'Types/ContentTypes'
import React from 'react'
// import Gallery from './Gallery'
import Text from './Text'
import Image from './Image'
// import Animation from './Animation'
import Video from './Video'
import Header from './Header'
import PageLink from './PageLink'
import PTs from 'prop-types'

// const Wrapper = styled.div`
// 	outline: 1px solid mediumslateblue;
// 	padding: 20px 5px 5px;
// 	margin: 5px 0;
// 	position: relative;

// 	${({ type }) => `
// 		&:after {
// 			content: "${type}";
// 			position: absolute;
// 			top: 2px;
// 			left: 2px;
// 			font-size: 10px;
// 			font-family: Consolas, monaco, monospace;
// 			color: mediumslateblue;
// 		}
// 	`};
// `

/**
 * Block
 */

type Props = {
	block: ContentBlock,
}

const Block = ({ block }: Props) => {
	switch (block._type) {
		// case 'gallery':
		// 	return <Gallery {...block} />
		case 'image':
			return <Image {...block} />
		case 'videoEmbed':
			return <Video {...block} />
		case 'richText':
			return <Text {...block} />
		case 'header':
			return <Header {...block} />
		case 'pageLink':
			return <PageLink {...block} />
		default:
			throw new Error(`There is no content component for "${block._type}"`)
	}
}

// Block.defaultProps = {
// 	isRequired: PTs.string.isRequired,
// }

// const Block = (props: Props) => (
// 	<Wrapper>
// 		<BlockByType {...props} />
// 	</Wrapper>
// )

// Block.defaultProps = {
// 	isRequired: null,
// }

export default Block
