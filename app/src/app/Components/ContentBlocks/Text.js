// @flow
import * as React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { Link } from 'react-router-dom'
import type { RichTextBlock, Mark } from 'Types/ContentTypes'
import { SanityImage, VideoEmbed } from 'Components/Media'
import { parseUrl } from 'Utils/parsing'
import { TextAnchor, Li, Ul, Ol, Header1, Header2, Header3, Header4, Header5, Header6, P, BlockQuote } from 'Components/Type'

const serializers = {
	list: (props) => {
		if (props.type === 'number') return <Ol {...props} />
		return <Ul {...props} />
	},
	listItem: (props) => <Li {...props} />,
	block: (props): React.Node => {
		const style = props.node.style || 'normal'
		if (props.node._type === 'image') return <SanityImage image={props.node} />
		if (props.node._type === 'videoEmbed') return <VideoEmbed video={props.node} />

		switch (style) {
			case 'h1':
				return <Header1 {...props} />
			case 'h2':
				return <Header2 {...props} />
			case 'h3':
				return <Header3 {...props} />
			case 'h4':
				return <Header4 {...props} />
			case 'h5':
				return <Header5 {...props} />
			case 'h6':
				return <Header6 {...props} />
			case 'blockquote':
				return <BlockQuote {...props} />
			case 'normal':
				return <P {...props} />
			default:
				return <P {...props} />
		}
	},
	marks: {
		link: ({ mark, children }: Mark) => {
			const { hostname } = process.browser ? window.location : 'hikawa.studio'
			const parsed = parseUrl(mark.href)
			const isExternal = parsed && parsed.origin && parsed.origin.match(hostname) === null
			if (isExternal || !parsed) {
				return (
					<TextAnchor href={mark.href} target={isExternal ? '_blank' : ''} rel="noopener noreferrer">
						{children}
					</TextAnchor>
				)
			}
			return <Link to={`${parsed.pathname}${parsed.search}`}>{children}</Link>
		},
	},
}

type Props = {
	blocks: Array<RichTextBlock>,
}

const Text = ({ blocks }: Props) => (
	<BlockContent blocks={blocks} imageOptions={{ w: 320, h: 240, fit: 'max' }} serializers={serializers} />
)

export default Text
