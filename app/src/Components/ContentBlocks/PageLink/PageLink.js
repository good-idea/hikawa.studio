// @flow
import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import type { PageLink } from 'Types/ContentTypes'
import { Header3, Header5 } from 'Components/Type'
import { Image } from 'Components/Media'
import { getLinkUrl } from 'Utils/content'
import { HomepageWrapper } from 'Views/Kame/styled'

const ImageWrapper = styled.div`
	position: relative;
	overflow: hidden;
`

const Text = styled.div`
	transform: rotate(1deg);
`

const PrimaryImage = styled.div``

const HoverImage = styled.div`
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
	${({ offset }) => css`
		animation: ${orbit} calc(5s + (${(offset * 9) % 5}s) * 3) infinite linear;
	`}
	&:hover {
		animation-play-state: paused;
	}
`

const Wrapper = styled.div`
	${({ theme }) => css`
		padding: ${theme.layout.spacing.single};
		position: relative;

		&:hover {
			color: ${theme.color.pink};

			${HoverImage} ~ ${PrimaryImage} {
				opacity: 0;
			}

			${HoverImage} {
				opacity: 1;
			}
		}

		${HomepageWrapper} &:hover {
			color: white;
		}
	`};
`

/**
 * PageLink
 */

type Props = {
	item: PageLink,
	number?: number,
	imageSizes: string,
}

const PageLinkBlock = ({ item, number, imageSizes }: Props) => {
	const { link, images, caption, label } = item
	if (!link) return null
	const url = getLinkUrl(link)
	const headerText = label || (link && link.title)
	const fallbackImage =
		link.__typename === 'Collection' ? link.image : link.__typename === 'Product' ? link.images && link.images[0] : null
	const primaryImage = images && images.length ? images[0] : fallbackImage
	const hoverImage = images && images.length > 1 ? images[1] : null
	console.log(imageSizes)
	return (
		<Orbit offset={number}>
			<Link to={url}>
				<Wrapper>
					<ImageWrapper>
						{hoverImage && (
							<HoverImage>
								<Image image={hoverImage} sizes={imageSizes} />
							</HoverImage>
						)}
						{primaryImage && (
							<PrimaryImage>
								<Image image={primaryImage} sizes={imageSizes} />
							</PrimaryImage>
						)}
					</ImageWrapper>
					<Text>
						<Header3 align="center">{headerText}</Header3>
						{caption && <Header5>{caption}</Header5>}
					</Text>
				</Wrapper>
			</Link>
		</Orbit>
	)
}

PageLinkBlock.defaultProps = {
	number: 0,
}

export default PageLinkBlock
