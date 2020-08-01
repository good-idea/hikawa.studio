export const product = {
  fields: [
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      title: 'Related',
      type: 'array',
      name: 'related',
      description: 'Link to a Page, Product, Collection, or URL',
      of: [
        {
          type: 'pageLink',
          options: {
            collections: false,
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
  ],
}
