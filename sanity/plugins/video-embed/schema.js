import { AiOutlineVideoCamera } from 'react-icons/ai'
import VideoEmbedPreview from './components/VideoPreview'
// import VideoEmbedInput from './components/VideoInput'

export default {
  type: 'object',
  name: 'videoEmbed',
  title: 'Video',
  icon: AiOutlineVideoCamera,
  fields: [
    {
      name: 'service',
      type: 'string',
      title: 'Video service',
      options: {
        list: ['vimeo', 'youtube'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoId',
      type: 'string',
      title: 'Video ID',
      description:
        'Get this from the video URL. Youtube: https://www.youtube.com/watch?v=VIDEO_ID | Vimeo: https://vimeo.com/VIDEO_ID  ',
      validation: (Rule) =>
        Rule.required().custom((videoId) =>
          /^[a-zA-Z0-9]+$/.test(videoId)
            ? true
            : 'Video ID must be only letters or numbers. If you entered a URL, include only the ID. See the help text above for where to find this.',
        ),
    },
    {
      name: 'alt',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      title: 'Autoplay',
    },
  ],
  // inputComponent: VideoEmbedInput,
  preview: {
    select: {
      videoId: 'videoId',
      service: 'service',
      caption: 'alt',
    },
    prepare: ({ videoId, service, caption }) => ({
      title: caption || '(No caption)',
      subtitle: `${service}: ${videoId}`,
      media: AiOutlineVideoCamera,
    }),
    // component: VideoEmbedPreview,
  },
}
