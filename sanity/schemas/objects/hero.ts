export const heroSlide = {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'richImage' }],
      validation: (Rule) => Rule.max(2),
    },
    {
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Link', value: 'link' },
            ],
          },
        },
      ],
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'cta',
    },
  ],
  preview: {
    select: {
      images: 'images',
      cta: 'cta',
    },
    prepare: ({ images, cta }) => ({
      media: images?.length ? images[0] : undefined,
      title: cta?.label,
    }),
  },
}

export const hero = {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      title: 'Slides',
      name: 'heroSlides',
      type: 'array',
      of: [{ type: 'heroSlide' }],
    },
  ],
}
