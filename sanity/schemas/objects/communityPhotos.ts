export const communityPhotos = {
  type: 'object',
  name: 'communityPhotos',
  title: 'Community Photos',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'richImage' }],
    },
  ],
}
