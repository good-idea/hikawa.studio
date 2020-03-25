import { FaTable } from 'react-icons/fa'

const gallery = {
	title: 'Gallery',
	name: 'gallery',
	type: 'object',
	icon: FaTable,
	fields: [
		{
			name: 'title',
			title: 'Gallery Title',
			type: 'string',
			validation: (Rule) => Rule.max(35),
		},
		{
			name: 'items',
			title: 'Gallery Items',
			type: 'array',
			of: [
				{
					name: 'header',
					title: 'Header',
					type: 'string',
				},
				{ name: 'richText', type: 'richText' },
				{ name: 'imageWithAltText', type: 'imageWithAltText' },
				// { type: 'videoEmbed' },
				// { type: 'lottie' },
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare: ({ title, items }) => {
			const grouped = items.reduce((acc, item) => {
				const { _type } = item
				const previousOfType = acc[_type] || []
				return {
					...acc,
					[_type]: [item, ...previousOfType],
				}
			}, {})
			const subtitle = Object.entries(grouped)
				.map(([type, i]) => {
					const l = i.length
					switch (type) {
						case 'image':
							return `${l} image${l > 1 ? 's' : ''}`
						// case 'lottie':
						// 	return `${l} animation${l > 1 ? 's' : ''}`
						// case 'videoEmbed':
						// 	return `${l} video${l > 1 ? 's' : ''}`
						case 'header':
							return `${l} header${l > 1 ? 's' : ''}`
						case 'richText':
							return `${l} text block${l > 1 ? 's' : ''}`
						default:
							return false
					}
				})
				.filter(Boolean)
				.join(', ')

			return {
				title: title || 'Untitled',
				subtitle,
			}
		},
	},
}

export default gallery
