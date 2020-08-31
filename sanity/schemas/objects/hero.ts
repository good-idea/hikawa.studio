export const hero = {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'richImage',
        },
      ],
    },
  ],
}
