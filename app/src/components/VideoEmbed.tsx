import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import ReactPlayer from 'react-player'
import { VideoEmbed as VideoEmbedType } from '../types'

const getVideoUrl = (service: string, videoId: string) => {
  switch (service) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${videoId}`
    case 'vimeo':
      return `https://vimeo.com/${videoId}`
    default:
      throw new Error(`No video URL builder set up for service: ${service}`)
  }
}

const VideoWrapper = styled.div`
  position: relative;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`

const VideoPadding = styled.div`
  padding-bottom: 56.25%;
`

/**
 * Video
 */

interface VideoProps {
  video: VideoEmbedType
}

export const VideoEmbed = ({ video }: VideoProps) => {
  const { service, videoId } = video
  if (!service || !videoId) return null
  const videoUrl = getVideoUrl(service, videoId)
  return (
    <VideoWrapper>
      <VideoPadding />
      <ReactPlayer
        url={videoUrl}
        muted
        volume={0}
        height="100%"
        width="100%"
        playing
      />
    </VideoWrapper>
  )
}
