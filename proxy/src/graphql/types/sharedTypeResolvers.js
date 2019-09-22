// @flow
import client from '../../services/sanity'
import { getAssetField } from './utils'

export const getLink = async (parent, args, context, info) => {
	const parentLink = parent.link[0]
	if (!parentLink) return null
	if (parentLink._ref === 'shop') {
		const shopPage = await client.getById('shop')
		return shopPage
	}
	if (parentLink._type !== 'shopifyItem') return parentLink
	info.cacheControl.setCacheHint({ maxAge: 3600 })
	const shopifyLink = await info.mergeInfo.delegateToSchema({
		schema: context.subSchemas.shopify,
		operation: 'query',
		fieldName: 'node',
		args: {
			id: parentLink.itemId,
		},
		context,
		info,
	})
	if (!shopifyLink) return null
	return {
		...parentLink,
		...shopifyLink,
	}
}

export const sharedResolvers = {
	TextNode: {
		__resolveType: (obj) => {
			switch (obj._type) {
				case 'block':
					return 'TextBlock'
				case 'image':
					return 'SanityImage'
				case 'videoEmbed':
					return 'VideoEmbed'
				default:
					return null
			}
		},
	},
	ContentBlock: {
		__resolveType: (obj) => {
			switch (obj._type) {
				case 'pageLink':
					return 'PageLink'
				case 'header':
					return 'Header'
				case 'richText':
					return 'RichText'
				case 'gallery':
					return 'Gallery'
				case 'image':
					return 'SanityImage'
				default:
					return null
			}
		},
	},
	SanityImage: {
		_ref: (parent) => parent.asset && parent.asset._ref,
		_type: () => 'image',
		// create a fake 'key', this helps with prop types on the frontend
		_key: (parent) => {
			return parent._key || (parent.asset && parent.asset._ref)
		},
		id: (parent) => parent.asset && parent.asset._ref,
		altText: async (...args) => {
			const altText = await getAssetField('altText')(...args)
			return altText || ''
		},
		url: getAssetField('url'),
		metadata: getAssetField('metadata'),
		size: getAssetField('size'),
	},
	LinkedItem: {
		__resolveType: (obj) => {
			switch (obj._type) {
				case 'shopifyItem':
					return obj.itemType
				case 'page':
					return 'Page'
				case 'pageLink':
					return 'PageLink'
				case 'urlLink':
					return 'UrlLink'
				case 'shop':
					return 'ShopPage'
				default:
					return null
			}
		},
	},
	PageLink: {
		link: getLink,
	},
}
