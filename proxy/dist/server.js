const path = require('path')
require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

console.log(process.env.NODE_ENV)
const runServer = require('@good-idea/shopify-sanity-proxy-server').default

runServer()
