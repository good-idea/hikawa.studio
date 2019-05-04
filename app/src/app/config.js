// @flow
export const apiRoot =
	process.env.BROWSER && process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql' : '/graphql'
