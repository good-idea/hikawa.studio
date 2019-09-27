// @flow
import React from 'react'
import ReactPlayer from 'react-player'

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

const Video = (props: Props) => {
	const { service, videoId } = props
	const videoUrl = getVideoUrl(service, videoId)
	return <ReactPlayer url={videoUrl} muted volume={0} width="100%" playing />
}

export default Video
