export const seo = {
  title: 'SEO & Accessibility',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'Page Title',
      name: 'name',
      type: 'string',
      description: 'Title for the browser window',
    },
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'title for search results (will fall back to Page title)',
    },

    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description:
        'This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'Best dimensions: 1200 x 600px',
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'string',
      description: 'Comma-separated SEO keywords',
    },

    {
      title: 'Accessibility: Link Label',
      type: 'string',
      name: 'linkLabel',
      description:
        'This text will be used on screen readers when this page is linked to throughout the site. This should be descriptive: "Learn about our company" is better than "About". These link labels also help with SEO.',
    },
  ],
}
