export const collection = {
  fieldsets: [
    {
      name: 'theme',
      title: 'Theme',
      options: { collapsed: true, collapsible: true },
    },
  ],
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
      fieldset: 'theme',
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'color',
    },
    {
      fieldset: 'theme',
      title: 'Key Color',
      name: 'keyColor',
      type: 'color',
      description: 'Used for primary text',
    },
    {
      fieldset: 'theme',
      title: 'Secondary Color',
      name: 'secondaryColor',
      type: 'color',
    },
    {
      name: 'communityPhotos',
      title: 'Community Photos',
      type: 'communityPhotos',
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
