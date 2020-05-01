// @flow
import * as React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { Link } from 'react-router-dom'
import type { RichTextBlock, Mark } from 'Types/ContentTypes'
import { SanityImage, VideoEmbed } from 'Components/Media'
import { parseUrl } from 'Utils/parsing'
import { TextAnchor, Li, Ul, Ol, Header1, Header2, Header3, Header4, Header5, Header6, P, BlockQuote } from 'Components/Type'

const createSerializers = (customWrapper: any) => ({
	list: (props) => {
		if (props.type === 'number') return <Ol {...props} />
		return <Ul {...props} />
	},
	listItem: (props) => <Li {...props} />,
	block: (baseProps): React.Node => {
		const props = {
			...baseProps,
			children: baseProps.children.map((c) => (c === '' ? '\u00a0' : c)),
		}
		const style = props.node.style || 'normal'
		if (props.node._type === 'image') return <SanityImage image={props.node} />
		if (props.node._type === 'videoEmbed') return <VideoEmbed video={props.node} />

		if (customWrapper) {
			const Wrapper = customWrapper
			return <Wrapper {...props} />
		}
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
			default:
				return <P {...props} />
		}
	},
	marks: {
		link: ({ mark, children }: Mark) => {
			const hostname = typeof window !== 'undefined' ? window.location.hostname : 'baileyhikawa.com'
			const parsed = parseUrl(mark.href)
			const isExternal = parsed && parsed.origin && parsed.origin.match(hostname) === null
			if (isExternal || !parsed) {
				return (
					<TextAnchor href={mark.href} target={isExternal ? '_blank' : ''} rel="noopener noreferrer">
						{children}
					</TextAnchor>
				)
			}
			const to = `${parsed.pathname}${parsed.search || ''}`
			return <Link to={to}>{children}</Link>
		},
	},
})

type Props = {
	blocks: Array<RichTextBlock>,
	customWrapper: any,
}

const Text = ({ blocks, customWrapper }: Props) => {
	return (
		<BlockContent blocks={blocks} imageOptions={{ w: 320, h: 240, fit: 'max' }} serializers={createSerializers(customWrapper)} />
	)
}

export default Text
