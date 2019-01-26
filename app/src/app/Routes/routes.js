// @flow
import Homepage from 'Views/Homepage'
import Product from 'Views/Product'
import Page from 'Views/Page'
import Shop from 'Views/Shop'
import { homepageQuery, productQuery, shopQuery, pageQuery } from './queries'

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
