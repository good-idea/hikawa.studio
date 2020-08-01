import { FaShoppingBag } from 'react-icons/fa'

export const shop = {
  title: 'Shop',
  name: 'shop',
  type: 'document',
  icon: FaShoppingBag,
  fields: [
    {
      title: 'Page Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      title: 'Collections',
      name: 'collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'shopifyCollection' }] }],
    },
    {
      name: 'seo',
      type: 'seo',
    },
  ],
}
