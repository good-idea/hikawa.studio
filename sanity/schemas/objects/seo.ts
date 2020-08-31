export const seo = {
  title: 'SEO & Accessibility',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'SEO: Page Title',
      name: 'name',
      type: 'string',
      description:
        'This will be used in addition to the main site SEO title. "About" will turn into → "About | Kame"',
    },
    {
      title: 'SEO: Description',
      name: 'description',
      type: 'text',
      description:
        'This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters',
    },
    {
      title: 'SEO: Image',
      name: 'image',
      type: 'image',
      description: 'Best dimensions: 1200 x 600px',
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
