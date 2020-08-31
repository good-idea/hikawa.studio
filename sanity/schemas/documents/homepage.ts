import { FaParagraph } from 'react-icons/fa'

export const homepage = {
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  fields: [
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'richText' }, { type: 'pageLink' }],
    },
    {
      type: 'seo',
      name: 'seo',
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage',
    }),
  },
}
