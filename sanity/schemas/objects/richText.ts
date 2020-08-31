import { FaParagraph } from 'react-icons/fa'

export const richText = {
  title: 'Text',
  name: 'richText',
  type: 'object',
  icon: FaParagraph,
  fields: [
    {
      name: 'blocks',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width',
      description: '(Only applies to text blocks on the homepage)',
    },
  ],
  preview: {
    select: {
      blocks: 'blocks',
    },
    prepare(value) {
      const block = (value.blocks || []).find((b) => b._type === 'block')
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
}
