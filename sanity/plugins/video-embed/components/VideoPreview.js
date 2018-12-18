/* eslint-disable react/no-multi-comp, react/display-name */
import React from 'react'
import humanizeList from 'humanize-list'
import PropTypes from 'prop-types'
import { FaFilm, FaYouTube, FaVimeo } from 'react-icons/fa'

/**
 * adapted from:
 * https://github.com/sanity-io/sanity/blob/master/packages/example-studio/components/VideoEmbedPreview/VideoEmbedPreview.js
 */

const styles = {
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0.5em',
	},
}

export const SUPPORTED_SERVICES = [
	// .id in entries here must match the `service` id returned from from getVideoId,
	// see https://github.com/radiovisual/get-video-id
	{
		id: 'youtube',
		title: 'YouTube',
		url: (id) => `https://www.youtube.com/embed/${id}?rel=0`,
		icon: FaYouTube,
	},
	{
		id: 'vimeo',
		title: 'Vimeo',
		url: (id) => `https://player.vimeo.com/video/${id}`,
		icon: FaVimeo,
	},
]

const VideoEmbedPreview = (props) => {
	const { value } = props

	if (!value || !value.id) {
		return (
			<div className={styles.root}>
				<div />
				<FaFilm size={30} />
			</div>
		)
	}

	const service = value && SUPPORTED_SERVICES.find((s) => s.id === value.service)

	if (!service) {
		return (
			<div className={styles.root}>
				<div className={styles.unrecognizedService}>
					Unrecognized video service. Supported services are {humanizeList(SUPPORTED_SERVICES.map((s) => s.title))}
				</div>
			</div>
		)
	}

	const Icon = service.icon || FaFilm
	return (
		<div className={styles.root}>
			<iframe src={service.url(value.id)} frameBorder="0" allowFullScreen />
			<Icon size={30} />
		</div>
	)
}

VideoEmbedPreview.propTypes = {
	value: PropTypes.shape({
		service: PropTypes.string,
		id: PropTypes.string,
	}),
}

VideoEmbedPreview.defaultProps = {
	value: {
		service: null,
		id: null,
	},
}

export default VideoEmbedPreview
