import { FaHeading } from 'react-icons/fa'

export const header = {
  name: 'header',
  title: 'Header',
  type: 'object',
  icon: FaHeading,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
}
