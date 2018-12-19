// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import VimeoPlayer from 'react-player/lib/players/Vimeo'
import YouTubePlayer from 'react-player/lib/players/YouTube'

const VideoPadding = styled.div`
	${({ ratio }) => css`
		width: 100%;
		padding-bottom: calc(100% * ${ratio || 0.56});
	`}
`

const VideoWrapper = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;

	iframe {
		position: absolute;
		left: 0;
		top: 0;
		width: calc(100% + 6px);
		height: 100%;
	}
`

const getVideoUrl = (service: 'youtube' | 'vimeo', videoId: string) => {
	switch (service) {
		case 'youtube':
			return `https://www.youtube.com/watch?v=${videoId}`
		case 'vimeo':
			return `https://vimeo.com/${videoId}`
		default:
			throw new Error(`No video URL builder set up for service: ${service}`)
	}
}

/**
 * Video
 */

const players = {
	vimeo: VimeoPlayer,
	youtube: YouTubePlayer,
}

type Props = {
	video: {
		service: 'youtube' | 'vimeo',
		videoId: string,
	},
}

const Video = ({ video }: Props) => {
	const { service, videoId } = video
	if (!videoId) return null
	const videoUrl = getVideoUrl(service, videoId)
	const Player = players[service]
	if (!Player) throw new Error(`There is no player for service "${service}"`)
	return (
		<VideoWrapper>
			<VideoPadding>
				<Player url={videoUrl} width="100%" height="100%" style={{ position: 'absolute', top: 0 }} position="absolute" />
			</VideoPadding>
		</VideoWrapper>
	)
}

export default Video
