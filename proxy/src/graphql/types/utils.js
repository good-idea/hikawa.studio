// @flow
import * as R from 'ramda'

const getCustomField = (method: 'getCollection' | 'getProduct') => (field: string) => async (
	parent: any,
	_,
	{ dataSources },
): any => {
	const fetchedItem = await dataSources.sanity.client[method](parent.itemId || parent.id)
	if (!fetchedItem) return parent[field]
	const item = fetchedItem[field] || parent[field]
	if (!item) return undefined
	if ((item._type === 'image' || item._type === 'imageWithAltText') && !item.asset) return null
	return item
}

export const getCollectionField = getCustomField('getCollection')
export const getProductField = getCustomField('getProduct')

export const getRefField = (field: string) => async (parent, _, { dataSources }) => {
	const id = parent._id || parent._ref
	if (!id) throw new Error('This item does not have a ref or id')
	const fetched = await dataSources.sanity.client.getById(id)
	if (!fetched) return parent[field]
	const fieldPath = field.split('.')
	return R.path(fieldPath, fetched) || R.path(fieldPath, parent)
}

export const getRefFields = (field: string) => async (parent, _, { dataSources }) => {
	const refs = parent[field]
	if (!refs) return null
	const ids = refs.map((r) => r._ref)
	const docs = await dataSources.sanity.client.getByIds(ids)
	return docs
}

export const getAssetField = (field: string) => async (parent, _, { dataSources }) => {
	if (!parent.asset || !parent.asset._ref) return null
	const fetched = await dataSources.sanity.client.getById(parent.asset._ref)
	if (!fetched) return parent[field]
	return fetched[field] || parent[field]
}
