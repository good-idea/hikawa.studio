// @flow
import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
// import { renderBlockText } from './'

/**
 * Text
 */

type TextChild = {
	_key: string,
	_type: string,
	text: string,
	marks: Array<string>,
}

type MarkDef = {
	_type: string,
	href: string,
}

type TextBlock = {
	children: Array<TextChild>,
	markDefs: Array<MarkDef>,
	style: string,
}

type Props = {
	blocks?: Array<TextBlock>,
}

const Text = ({ blocks }: Props) => {
	console.log(blocks)
	// return <p>text block</p>
	return blocks && blocks.length ? <BlockContent blocks={blocks} /> : null
}

Text.defaultProps = {
	blocks: [],
}

export default Text
