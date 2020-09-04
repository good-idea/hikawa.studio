export const product = {
  fields: [
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      title: 'Klaviyo Form ID',
      name: 'klaviyoFormID',
      type: 'string',
      description: 'Just the id within class="..." i.e. klaviyo-form-ABC123',
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
