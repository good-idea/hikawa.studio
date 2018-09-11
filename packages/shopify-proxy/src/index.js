// @flow
import Koa from 'koa'
import Router from 'koa-router'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import shopifyProxy from './services/shopify'

const app = new Koa()

/**
 * Routes
 */

const router = new Router()

router.post('/graphql', shopifyProxy)

/**
 * App
 */

app.use(helmet())
app.use(bodyParser())
app.use(cors({ origin: '*' }))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
	console.log('App listening on port 3000')
})
