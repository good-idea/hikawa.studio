import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdHome } from 'react-icons/md'
import { TiDevicePhone, TiThSmallOutline, TiDocument } from 'react-icons/ti'

export default () =>
	S.list()
		.title('Site')
		.items([
			S.listItem()
				.title('Homepage')
				.icon(MdHome)
				.child(
					S.editor()
						.id('homepage')
						.schemaType('homepage')
						.documentId('homepage'),
				),

			// Products
			S.listItem()
				.id('products')
				.title('Products')
				.icon(TiDevicePhone)
				.child(S.documentTypeList('product')),

			// Collections
			S.listItem()
				.id('collections')
				.title('Collections')
				.icon(TiThSmallOutline)
				.child(S.documentTypeList('collection')),

			// Pages
			S.listItem()
				.id('pages')
				.title('Pages')
				.icon(TiDocument)
				.child(S.documentTypeList('page')),

			S.listItem()
				.title('Site Settings')
				.icon(MdSettings)
				.child(
					S.editor()
						.id('config')
						.schemaType('siteSettings')
						.documentId('site-settings'),
				),

			// // Static pages: About, Contact
			// S.listItem()
			// 	.title('Other Pages')
			// 	.child(S.documentTypeList('staticPage').title('Pages')),
		])
