// @flow
import React from 'react'
import type { HeaderBlock } from 'Types/ContentTypes'
import { Header1 } from 'Components/Type'
import { FlexChild } from 'Components/Layout'

/**
 * Header
 */

const Header = (props: HeaderBlock) => (
	<FlexChild basis="100%">
		<Header1 align="center">{props.text}</Header1>
	</FlexChild>
)

export default Header
