export const urlLink = {
  type: 'object',
  name: 'urlLink',
  title: 'External URL',
  fields: [
    {
      type: 'string',
      title: 'Label',
      name: 'label',
      description:
        'Used in Navigation links as the link text. When used within a content block or page link, this text will not be visible, but will be used for accessibility.',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'boolean',
      title: 'foo',
      name: 'foo',
    },
    {
      type: 'url',
      label: 'URL',
      name: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
}
