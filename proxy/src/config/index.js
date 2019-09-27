// @flow

const path = require('path')
const parsed = require('dotenv').config({
	path: path.resolve(__dirname, '..', '.env'),
})

console.log(parsed)
