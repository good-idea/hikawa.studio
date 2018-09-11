// @flow
import type { Context } from 'koa'
import client from './shopifyClient'

const shopifyProxy = async (ctx: Context) => {
	const { query } = ctx.request.body
	const result = await client.request(query)
	ctx.body = result
}

export default shopifyProxy
