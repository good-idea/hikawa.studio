// @flow
import { getProductField } from '../utils'
// import { getLink } from '../sharedTypeResolvers'

const resolvers = {
	Product: {
		related: getProductField('related'),
		hero: getProductField('hero'),
	},
}

export default resolvers
