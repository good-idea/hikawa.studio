import { TiDocument } from 'react-icons/ti'
import { fields } from './shared'

const page = {
	title: 'Pages',
	name: 'page',
	type: 'document',
	icon: TiDocument,
	fields: [
		fields.pageTitle,
		fields.pageBanner,
		fields.pageSlug,
		{
			name: 'blocks',
			title: 'Text',
			type: 'array',
			of: [{ type: 'block' }, { type: 'imageWithAltText' }],
		},
		fields.pageSeo,
	],
}

export default page
