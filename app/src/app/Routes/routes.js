// @flow
import Kame from 'Views/Kame'
import Product from 'Views/Product'
import Page from 'Views/Page'
import Shop from 'Views/Shop'
import { homepageQuery, productQuery, shopQuery, pageQuery } from './queries'

const routes = [
	{
		path: '/',
		query: homepageQuery,
		Component: Kame,
	},
	{
		path: '/shop/:collection?',
		query: shopQuery,
		Component: Shop,
	},
	{
		path: '/products/:handle',
		query: productQuery,
		Component: Product,
	},
	{
		path: '/:slug',
		query: pageQuery,
		Component: Page,
	},
]

export default routes
