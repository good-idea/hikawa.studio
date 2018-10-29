// @flow
import type { ContentBlock } from 'Types/SharedTypes'
import React from 'react'
import styled from 'styled-components'
import Gallery from './Gallery'
import Text from './Text'
import Image from './Image'
// import Animation from './Animation'
import Video from './Video'
import Header from './Header'
import PageLink from './PageLink'

const Wrapper = styled.div`
	outline: 1px solid mediumslateblue;
	padding: 20px 5px 5px;
	margin: 5px 0;
	position: relative;

	${({ type }) => `
	
		&:after {
			content: "${type}";
			position: absolute;
			top: 2px;
			left: 2px;
			font-size: 10px;
			font-family: Consolas, monaco, monospace;
			color: mediumslateblue;
		}
	`};
`

/**
 * Block
 */

const components = new Map([
	['gallery', Gallery],
	['image', Image],
	['videoEmbed', Video],
	['richText', Text],
	// ['lottie', Animation],
	['header', Header],
	['pageLink', PageLink],
])

type Props = ContentBlock

const Block = (props: Props) => {
	const Component = components.get(props._type)
	if (!Component) {
		console.warn(`There is no content component for "${props._type}"`)
		return null
	}
	return (
		<Wrapper type={props._type}>
			<Component {...props} />
		</Wrapper>
	)
}

export default Block
