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
      of: [
        {
          name: 'richText',
          type: 'object',
          title: 'Text',
          icon: FaParagraph,
          fields: [
            {
              name: 'blocks',
              title: 'Text',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Header 1', value: 'h1' },
                    { title: 'Header 2', value: 'h2' },
                  ],
                  lists: [],
                  marks: {
                    annotations: [],
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                  },
                },
              ],
            },
            {
              type: 'boolean',
              name: 'fullWidth',
              title: 'Full Width',
            },
          ],
          preview: {
            select: {
              blocks: 'blocks',
            },
            prepare(value) {
              const block = (value.blocks || []).find(
                (b) => b._type === 'block',
              )
              return {
                title: block
                  ? block.children
                      .filter((child) => child._type === 'span')
                      .map((span) => span.text)
                      .join('')
                  : 'No title',
              }
            },
          },
        },
        { type: 'pageLink' },
      ],
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
