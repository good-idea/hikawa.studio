// @flow
import * as R from 'ramda'
import type { LoadingState } from 'Types/GraphQLTypes'

export const unwindEdges = (o: Object): Object => {
	if (typeof o !== 'object') return o
	return R.pipe(
		R.toPairs,
		// Iterate over the properties and their values
		R.reduce(
			(acc, [key, value]) =>
				value && value.edges && Array.isArray(value.edges)
					? // When the value has an 'edges' property that is an array,
					  R.pipe(
							// Pull out the 'pageInfo' prop and rename it
							R.assoc(`${key.replace(/Connection$/, '')}PageInfo`, value.pageInfo || {}),
							// And pluck out the nodes
							R.assoc(key.replace(/Connection$/, ''), R.pluck('node', value.edges).map(unwindEdges)),
					  )(acc)
					: // otherwise, if it's an object (and not null bc null is an object)
					  value && typeof value === 'object'
						? // unwind it
						  R.assoc(key, Array.isArray(value) ? value.map(unwindEdges) : unwindEdges(value))(acc)
						: // lastly, return the value as is
						  R.assoc(key, value)(acc),
			{},
		),
	)(o)
}

// Loading States

export const getNetworkStatus = (num: number): LoadingState => {
	switch (num) {
		case 1:
			return 'loading'
		case 4:
			return 'refetching'
		case 2:
		case 6:
			return 'passivelyRefetching'
		case 3:
			return 'fetchingMore'
		case 7:
			return 'ready'
		case 8:
			return 'errors'
		default:
			throw new Error(`Status number ${num} is not a valid network status`)
	}
}
