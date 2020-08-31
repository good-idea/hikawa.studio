import { TiDocument } from 'react-icons/ti'

export const page = {
  title: 'Pages',
  name: 'page',
  type: 'document',
  icon: TiDocument,
  fields: [
    {
      title: 'Page Title',
      name: 'title',
      type: 'string',
    },
    { name: 'slug', type: 'pageSlug' },
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      name: 'content',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }, { type: 'videoEmbed' }, { type: 'richImage' }],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'richImage' }],
    },
    {
      name: 'includeInstagram',
      title: 'Include Instagram links',
      type: 'boolean',
    },
    {
      name: 'seo',
      type: 'seo',
    },
  ],
}
