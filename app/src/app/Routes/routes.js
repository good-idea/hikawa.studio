// @flow
import loadable from '@loadable/component'
import { homepageQuery, productQuery, shopQuery, pageQuery } from './queries'

const Homepage = loadable(() => import('../Views/Homepage'))
const Product = loadable(() => import('../Views/Product'))
const Page = loadable(() => import('../Views/Page'))
const Shop = loadable(() => import('../Views/Shop'))

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
