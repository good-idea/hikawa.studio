export const pageSlug = {
  title: 'Page URI',
  name: 'pageSlug',
  type: 'slug',
  options: {
    source: 'title',
  },
  validation: (Rule) => Rule.required(),
}
