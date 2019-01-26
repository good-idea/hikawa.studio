const express = require('express')
const path = require('path')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const noFavicon = require('express-no-favicons')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const debug = require('debug')('server')
// const sitemap = require('./sitemap')
// const redirects = require('./redirects')
const clientConfig = require('../../webpack/client.local')
const serverConfig = require('../../webpack/server.local')

debug(`[${process.env.NODE_ENV}] Starting server..`)
debug('Compiling..')

const app = express()
const compiler = webpack([clientConfig, serverConfig])
const { publicPath } = clientConfig.output
const clientCompiler = compiler.compilers[0]
const options = { publicPath, stats: { colors: true } }
const devMiddleware = webpackDevMiddleware(compiler, options)

app.use(noFavicon())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.get('/sitemap.xml', sitemap)
// app.get('*', redirects)

app.use(express.static(path.resolve(__dirname, '..', '..', 'public'), { maxAge: '1y' }))
// app.use(publicPath, express.static(outputPath))
app.use(devMiddleware)
app.use(webpackHotMiddleware(clientCompiler))
// app.use(webpackHotServerMiddleware(compiler))
devMiddleware.waitUntilValid()
app.listen(3030, () => {
	debug('Server ready')
})
