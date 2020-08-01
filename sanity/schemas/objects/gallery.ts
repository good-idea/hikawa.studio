export const gallery = {
  type: 'object',
  name: 'gallery',
  title: 'Gallery',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'richImage' }],
    },
  ],
}
