// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SiteSettings } from 'Types/ContentTypes'
import Text from 'Components/ContentBlocks/Text'
import { sanityColorToRGBA } from 'Utils/sanity'

const AnnouncementWrapper = styled.div`
	${({ theme, announcement, open }) => `
		background-color: ${announcement.backgroundColor ? sanityColorToRGBA(announcement.backgroundColor) : theme.color.pink};
		color: ${announcement.textColor ? sanityColorToRGBA(announcement.textColor) : 'black'};
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		transform-origin: 0 50%;
		height: ${open ? theme.layout.announcementHeight : '0'};
		transition: 0.3s ease-out;
		text-align: center;
		font-size: ${theme.type.size.h5};
		font-weight: ${theme.type.weight.semi};
		text-align: center;
	`}
`

const CloseButton = styled.button`
	position: absolute;
	top: calc(50% - 8px);
	right: 20px;
	width: 16px;
	height: 16px;
	background-color: transparent;

	&:before,
	&:after {
		content: '';
		position: absolute;
		top: 50%;
		left: -15%;
		height: 2px;
		width: 130%;
		background-color: currentColor;
	}

	&:before {
		transform: rotate(-45deg);
	}
	&:after {
		transform: rotate(45deg);
	}
`

/**
 * Announcement
 */
type Props = {
	announcement: $PropertyType<SiteSettings, 'announcement'>,
	open: boolean,
	closeAnnouncement: () => void,
}

const Announcement = ({ announcement, open, closeAnnouncement }: Props) => {
	if (!announcement || !announcement.enabled) return null
	const blocks = announcement.text ? announcement.text.map((n) => ({ ...n, style: 'h5' })) : []
	return (
		<AnnouncementWrapper open={open} announcement={announcement}>
			<Text blocks={blocks} />
			<CloseButton onClick={closeAnnouncement} />
		</AnnouncementWrapper>
	)
}

export default Announcement