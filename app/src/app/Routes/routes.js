// @flow
import loadable from '@loadable/component'
import { homepageQuery, productQuery, shopQuery, pageQuery } from './queries'

const Homepage = loadable(() => import(/* webpackPrefetch: true */ '../Views/Homepage'))
const Product = loadable(() => import(/* webpackPrefetch: true */ '../Views/Product'))
const Page = loadable(() => import(/* webpackPrefetch: true */ '../Views/Page'))
const Shop = loadable(() => import(/* webpackPrefetch: true */ '../Views/Shop'))

const routes = [
	{
		path: '/',
		query: homepageQuery,
		exact: true,
		Component: Homepage,
	},
	{
		path: '/shop/:collection?',
		query: shopQuery,
		exact: true,
		Component: Shop,
	},
	{
		path: '/products/:handle',
		query: productQuery,
		exact: true,
		Component: Product,
	},
	{
		path: '/:slug',
		query: pageQuery,
		exact: true,
		Component: Page,
	},
]

export default routes
