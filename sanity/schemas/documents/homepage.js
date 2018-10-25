import { fields } from './shared'

const page = {
	title: 'Homepage',
	name: 'homepage',
	type: 'document',
	fields: [
		//
		fields.pageBanner,
		fields.pageContent,
		fields.pageSeo,
	],
	preview: {
		select: {},
		prepare: () => ({
			title: 'Homepage',
		}),
	},
}

export default page
