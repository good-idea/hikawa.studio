// @flow

export const apiRoot =
	process.env.NODE_ENV === 'development' && !process.env.SHARE_TUNNEL ? 'http://localhost:3000/' : 'https://kame-proxy.now.sh'
