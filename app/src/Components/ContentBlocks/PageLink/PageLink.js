// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import type { PageLink } from 'Types/ContentTypes'
import { Header2, Header5 } from 'Components/Type'
import { FlexChild } from 'Components/Layout'
import { Image } from 'Components/Media'
import { getLinkUrl, getLinkImage } from './pageLinkUtils'

const Wrapper = styled.div`
	${({ theme }) => theme.mixins.dashedBorder};
	${({ theme }) => `
		padding: ${theme.layout.spacing.single};
	`};
`

/**
 * PageLink
 */

const PageLinkBlock = (props: PageLink) => {
	if (!props.link) return null
	const url = getLinkUrl(props)
	const headerText = props.label || (props.link && props.link.title)
	const image = getLinkImage(props)
	return (
		<FlexChild basis="50%">
			<Link to={url}>
				<Wrapper borderActiveOnHover>
					{image && <Image image={image} />}
					<Header2>{headerText}</Header2>
					{props.caption && <Header5>{props.caption}</Header5>}
				</Wrapper>
			</Link>
		</FlexChild>
	)
}

export default PageLinkBlock
