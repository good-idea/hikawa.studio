const ngrok = require('ngrok')
const path = require('path')
const debug = require('debug')('*')

require('dotenv').config({
	path: path.resolve(__dirname, '.env'),
})

const NGROCK_PORT = process.env.NGROCK_PORT || undefined

function NgrockWebpackPlugin(options) {
	this.options = Object.assign(
		{
			port: NGROCK_PORT,
		},
		options || {},
	)

	this.ngrock = {
		connected: false,
		http: '',
		https: '',
	}
}

NgrockWebpackPlugin.prototype.apply = async function apply(compiler) {
	const port = this.options.port || compiler.options.devServer.port || 80
	/* eslint-disable-next-line */
	compiler.options.devServer.disableHostCheck = true
	debug('\x1b[34m%s\x1b[0m', '\r\nngrock-webpack starting...')
	const url = await ngrok
		.connect({
			addr: port || 8080,
			proto: 'http',
			subdomain: process.env.NGROK_SUBDOMAIN,
			authToken: process.env.NGROK_AUTH_TOKEN,
		})
		.catch((e) => {
			debug('error', e)
		})

	debug('\x1b[34m%s\x1b[0m', `ngrock-webpack started: ${url}`)

	compiler.plugin('emit', (compilation, done) => {
		done()
	})
}

module.exports = NgrockWebpackPlugin
