// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import type { PageLink } from 'Types/ContentTypes'
import { Header3, Header5 } from 'Components/Type'
import { FlexChild } from 'Components/Layout'
import { Image } from 'Components/Media'
import { getLinkUrl, getLinkImage } from 'Utils/content'

const Wrapper = styled.div`
	${({ theme }) => `
		padding: ${theme.layout.spacing.single};
		&:hover {
			color: ${theme.color.pink};
		}
	`};
`

/**
 * PageLink
 */

const PageLinkBlock = (props: PageLink) => {
	if (!props.link) return null
	const url = getLinkUrl(props.link)
	const headerText = props.label || (props.link && props.link.title)
	const image = getLinkImage(props)
	return (
		<FlexChild basis="50%">
			<Link to={url}>
				<Wrapper>
					{image && <Image image={image} />}
					<Header3>{headerText}</Header3>
					{props.caption && <Header5>{props.caption}</Header5>}
				</Wrapper>
			</Link>
		</FlexChild>
	)
}

export default PageLinkBlock
