import * as React from 'react'
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
  return <ReactPlayer url={videoUrl} muted volume={0} width="100%" playing />
}
