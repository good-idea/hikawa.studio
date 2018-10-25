import * as React from 'react'
import client from 'part:@sanity/base/client'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

const ImagePreview = styled.img`
	width: 40px;
	height: 40px;
	object-fit: cover;
	margin: 0px 10px 0px 5px;
	background-color: lightGray;
`

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Title = styled.p`
	margin: 0;
`

const SubTitle = styled.h5`
	color: lightGray;
	font-weight: normal;
	margin: 0;
`

/**
 * PageLinkPreview
 */

const getLinkInfo = async (link) => {
	if (link._ref) {
		const linkedPage = await client.getDocument(link._ref)
		return {
			linkTitle: linkedPage.title,
			subtitle: 'page',
		}
	}
	return {
		linkTitle: link.title,
		subtitle: link.itemType,
		linkedSrc: link.previewImage,
	}
}

class PageLinkPreview extends React.Component {
	state = {
		src: undefined,
		title: '',
		subtitle: undefined,
	}

	componentDidMount() {
		this.fetchValues()
	}

	componentWillReceiveProps(nextProps) {
		this.fetchValues(nextProps)
	}

	fetchValues = async (props = this.props) => {
		if (!props || !props.value) return
		const { link, label, image } = props.value
		if (!link) return
		console.log('link', link)

		const { linkTitle, subtitle, linkedSrc } = await getLinkInfo(link[0])
		const userImage = image ? await client.getDocument(image.asset._ref) : null
		const userSrc = userImage ? `${userImage.url}?w=100` : null
		this.setState({ src: userSrc || linkedSrc, title: label || linkTitle, subtitle })
	}

	render() {
		const { src, title, subtitle } = this.state
		return (
			<Wrapper>
				<span role="img" aria-label="Links to:">
					🔗
				</span>
				{src && <ImagePreview src={src} />}
				<TextWrapper>
					<Title>{title}</Title>
					{subtitle && <SubTitle>{subtitle}</SubTitle>}
				</TextWrapper>
			</Wrapper>
		)
	}
}

const pageLink = {
	title: 'Page / Product Link',
	name: 'pageLink',
	type: 'object',
	fields: [
		{
			type: 'image',
			name: 'image',
			title: 'Image',
			description: '(optional) Alternate image',
		},
		{
			title: 'Link',
			name: 'link',
			type: 'array',
			of: [
				{ type: 'shopifyItem' },
				{
					type: 'reference',
					name: 'page',
					title: 'Page',
					description: 'Link to a Page, Product, or Collection',
					to: [{ type: 'page' }],
				},
			],
			validation: (Rule) => Rule.max(1).required(),
		},
		{
			type: 'string',
			name: 'label',
			title: 'Label',
			description: '(optional) If empty, the title of the linked page will be used.',
		},
		{
			type: 'string',
			name: 'caption',
			title: 'Caption',
		},
	],
	preview: {
		select: {
			link: 'link',
			image: 'image',
			label: 'label',
		},
		prepare: ({ link, label, image }) => {
			return { link, label, image }
		},
		component: PageLinkPreview,
	},
}

export default pageLink
