// @flow
import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import type { PageLink } from 'Types/ContentTypes'
import { Header3, Header5 } from 'Components/Type'
import { Image } from 'Components/Media'
import { getLinkUrl } from 'Utils/content'

const ImageWrapper = styled.div`
	position: relative;
	overflow: hidden;
`

const Text = styled.div`
	transform: rotate(1deg);
`

const PrimaryImage = styled.div``

const HoverWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
`

const orbit = keyframes`
    from { transform: rotate(0deg) translateX(3%) translateZ(0) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(3%) translateZ(0) rotate(-360deg); }
`

const Orbit = styled.div`
	&:hover {
		animation-play-state: paused;
	}
	animation: ${orbit} 5s infinite linear;
`

const Wrapper = styled.div`
	${({ theme }) => css`
		padding: ${theme.layout.spacing.single};
		position: relative;

		&:hover {
			color: ${theme.color.pink};

			${HoverWrapper} + ${PrimaryImage} {
				opacity: 0;
			}

			${HoverWrapper}, {
				opacity: 1;
			}
		}
	`};
`

/**
 * PageLink
 */

type Props = {
	item: PageLink,
	index?: number,
}

const PageLinkBlock = ({ item, index }: Props) => {
	console.log(item.link)
	const { link, images, caption, label } = item
	if (!link) return null
	const url = getLinkUrl(link)
	const headerText = label || (link && link.title)
	const fallbackImage =
		link.__typename === 'Collection' ? link.image : link.__typename === 'Product' ? link.images && link.images[0] : null
	const primaryImage = images && images.length ? images[0] : fallbackImage
	const hoverImage = images && images.length > 1 ? images[1] : null
	return (
		<Orbit>
			<Link to={url}>
				<Wrapper>
					<ImageWrapper>
						{primaryImage && (
							<PrimaryImage>
								<Image image={primaryImage} />
							</PrimaryImage>
						)}
						{hoverImage && false && (
							<HoverWrapper>
								<Image image={hoverImage} />
							</HoverWrapper>
						)}
					</ImageWrapper>
					<Text>
						<Header3>{headerText}</Header3>
						{caption && <Header5>{caption}</Header5>}
					</Text>
				</Wrapper>
			</Link>
		</Orbit>
	)
}

export default PageLinkBlock
