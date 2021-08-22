export const richImage = {
  name: 'richImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'credit',
      title: 'Credit',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description:
        'A short description of the image. Helps with accessibility and SEO',
      options: {
        isHighlighted: true,
      },
    },
  ],
  validation: (Rule) => {
    const { options } = Rule._typeDef
    if (options.required) return Rule.required()
    return Rule.custom(() => true)
  },
  preview: {
    select: {
      caption: 'caption',
      credit: 'credit',
      altText: 'altText',
      asset: 'asset',
    },
    prepare: ({ asset, caption, credit, altText }) => {
      const [title, subtitle] = [caption, credit, altText].filter(Boolean)
      return {
        title,
        subtitle,
        media: asset,
      }
    },
  },
}
