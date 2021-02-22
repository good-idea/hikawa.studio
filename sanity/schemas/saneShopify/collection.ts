export const collection = {
  fields: [
    {
      type: 'shopifySourceData',
      name: 'sourceData',
      title: 'Shopify Source Data',
      hidden: true,
    },
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'color',
    },
    {
      title: 'Key Color',
      name: 'keyColor',
      type: 'color',
      description: 'Used for primary text',
    },
    {
      title: 'Secondary Color',
      name: 'secondaryColor',
      type: 'color',
    },

    {
      title: 'SEO',
      name: 'seo',
      type: 'seo',
      description:
        'Custom SEO settings. By default, the collection description and image will be used.',
    },
  ],
}
