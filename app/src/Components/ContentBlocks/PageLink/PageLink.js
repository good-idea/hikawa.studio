// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import type { PageLink } from 'Types/ContentTypes'
import { Header3, Header5 } from 'Components/Type'
import { ImageBox } from 'Components/Media'
import { getLinkUrl } from 'Utils/content'

const PrimaryImage = styled.div``

const HoverImage = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
`

const Wrapper = styled.div`
	${({ theme }) => css`
		position: relative;
		color: rgb(45, 45, 45);

		&:hover {

			${HoverImage} ~ ${PrimaryImage} {
				opacity: 0;
			}

			${HoverImage} {
				opacity: 1;
			}
		}

		${theme.media.queries.phone`
			padding: 0;
		`}
	`};
`

const ImageWrapper = styled.div`
	position: relative;
	overflow: hidden;
`

const Text = styled.div`
	opacity: 0;
	position: absolute;
	padding: 5px 14px 2px;
	left: 20px;
	bottom: 20;
	background-color: rgba(255, 255, 255, 0.95);

	${Wrapper}:hover & {
		opacity: 1;
	}
`

/**
 * PageLink
 */

type Props = {
	item: PageLink,
	imageSizes: string,
	showHover?: boolean,
}

const PageLinkBlock = ({ item, imageSizes, showHover }: Props) => {
	const { link, images, caption, label } = item
	if (!link) return null
	const url = getLinkUrl(link)
	const headerText = label || (link && link.title)
	const fallbackImage =
		link.__typename === 'Collection' ? link.image : link.__typename === 'Product' ? link.images && link.images[0] : null
	const primaryImage = images && images.length ? images[0] : fallbackImage
	const hoverImage = images && images.length > 1 ? images[1] : null
	const ratio = item.fullWidth ? 0.56 : 1.2
	return (
		<Link to={url}>
			<Wrapper>
				<ImageWrapper>
					{hoverImage && showHover && (
						<HoverImage>
							<ImageBox ratio={ratio} image={hoverImage} sizes={imageSizes} />
						</HoverImage>
					)}
					{primaryImage && (
						<PrimaryImage>
							<ImageBox ratio={ratio} image={primaryImage} sizes={imageSizes} />
						</PrimaryImage>
					)}
				</ImageWrapper>
				<Text>
					<Header3 family="serif" align="center">
						{headerText}
					</Header3>
					{caption && <Header5>{caption}</Header5>}
				</Text>
			</Wrapper>
		</Link>
	)
}

PageLinkBlock.defaultProps = {
	showHover: false,
}

export default PageLinkBlock
