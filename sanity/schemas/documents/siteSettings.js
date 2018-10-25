import { pageFields } from './shared'

const page = {
	title: 'Site Settings',
	name: 'siteSettings',
	type: 'document',
	fields: pageFields,
	preview: {
		select: {},
		prepare: () => ({
			title: 'Site Settings',
		}),
	},
}

export default page
