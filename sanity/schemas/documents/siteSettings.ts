export const mailerSettings = {
  name: 'mailerSettings',
  title: 'Mailing List Settings',
  type: 'object',
  fields: [
    {
      name: 'popupEnabled',
      title: 'Enable Popup',
      type: 'boolean',
    },
    {
      name: 'popupText',
      title: 'Popup Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
    {
      name: 'popupBackground',
      type: 'richImage',
      title: 'Popup Background Image',
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
    {
      name: 'buttonLabel',
      title: 'Submit Button Label',
      type: 'string',
      validation: (Rule) => Rule.max(20),
    },
  ],
}

export const checkoutSettings = {
  name: 'checkoutSettings',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Global Checkout Notes',
      description: 'This text will appear below the cart summary',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
  ],
}
export const productSettings = {
  name: 'productSettings',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Global Product Notes',
      description: 'This text will appear below all product descriptions',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
  ],
}

export const instagram = {
  name: 'instagramSettings',
  type: 'object',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: "Don't include the @",
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'richImage',
        },
      ],
    },
  ],
}

export const mainNavigation = {
  name: 'mainNavigationSettings',
  label: 'Main Navigation',
  type: 'object',
  description: "The 'SHOP' link is included by default.",
  fields: [
    {
      name: 'links',
      title: 'Page Links',
      type: 'array',
      of: [
        {
          type: 'pageLink',
          name: 'pageLink',
        },
        {
          type: 'urlLink',
          name: 'urlLink',
        },
      ],
    },
  ],
}

export const footerSettings = {
  name: 'footerSettings',
  label: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'links',
      title: 'Page Links',
      type: 'array',
      of: [{ type: 'pageLink' }],
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            // annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
  ],
}

export const navigation = {
  name: 'navigationSettings',
  title: 'Navigation',
  type: 'object',
  fields: [
    {
      name: 'header',
      title: 'Main Navigation',
      type: 'mainNavigationSettings',
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'footerSettings',
    },
  ],
}

export const announcementText = {
  name: 'announcementText',
  type: 'object',
  fields: [
    {
      name: 'body',
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
      name: 'cta',
      type: 'cta',
      title: 'CTA',
    },
  ],
}

export const announcementBanner = {
  name: 'announcementSettings',
  label: 'Announcement Banner',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Enable Announcement',
      type: 'boolean',
    },
    {
      name: 'announcements',
      title: 'Announcements',
      type: 'array',
      of: [{ type: 'announcementText' }],
    },
    {
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'color',
    },
    {
      title: 'Text Color',
      name: 'textColor',
      type: 'color',
    },
  ],
}

export const siteSettings = {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'richImage',
    },
    {
      name: 'announcement',
      title: 'Announcement banner',
      type: 'announcementSettings',
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'navigationSettings',
    },
    {
      name: 'instagram',
      type: 'instagramSettings',
      title: 'Instagram Settings',
    },
    {
      name: 'product',
      type: 'productSettings',
    },

    {
      name: 'checkout',
      type: 'checkoutSettings',
    },
    {
      name: 'mailer',
      type: 'mailerSettings',
    },

    {
      name: 'highlight',
      title: 'Highlight Color',
      type: 'color',
    },
    {
      name: 'seo',
      title: 'SEO & Accessibility',
      type: 'seo',
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Site Settings',
    }),
  },
}
