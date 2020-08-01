export const mixedMedia = {
  title: 'Media',
  name: 'mixedMedia',
  type: 'array',
  of: [{ type: 'richImage' }],
  validation: (Rule) => Rule.max(2),
}
