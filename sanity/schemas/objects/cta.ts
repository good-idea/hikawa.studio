export const cta = {
  name: 'cta',
  title: 'CTA Button',
  type: 'object',
  fields: [
    {
      name: 'label',
      type: 'string',
      label: 'Label',
    },
    {
      name: 'link',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'page',
          title: 'Page',
          to: [
            { type: 'page' },
            { type: 'shopifyProduct' },
            { type: 'shopifyCollection' },
            { type: 'shop' },
          ],
        },
        { type: 'urlLink' },
      ],

      validation: (Rule) => Rule.max(1).required(),
      // options: {
      //   required: true,
      // },
    },
  ],
}
