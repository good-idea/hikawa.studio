// @flow
import React from 'react'
import Block from './index'
import { Grid } from 'Components/Layout'
/**
 * Gallery
 */

type Props = {
	_type: string,
	title?: string | void,
	items: Array<any>,
}

const Gallery = (props: Props) => {
	const { items, title } = props
	return (
		<div>
			{title ? title : null}
			<Grid>{items && items.map((c) => <Block key={c._key} {...c} />)}</Grid>
		</div>
	)
}

export default Gallery
