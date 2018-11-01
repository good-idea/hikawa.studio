// @flow
import Cookies from 'js-cookie'

export const VIEWER_CART_TOKEN = 'kame_cart'
export const VIEWER_ACCESS_TOKEN = 'kame_viewer'

type CookieConfig = {
	expires?: number,
	path?: string,
}

export const setCookie = (key: string, val: mixed, config?: CookieConfig) => {
	const defaults = {
		expires: 7,
		path: '/',
	}
	const settings = Object.assign(defaults, config)
	const stringified = JSON.stringify(val)
	Cookies.set(key, stringified, settings)
}

export const getCookie = (key: string) => {
	const value = Cookies.get(key)
	if (value) return JSON.parse(value)
	return null
}

export const removeCookie = (key: string) => {
	Cookies.remove(key)
}

export const persistData = (key: string, val: mixed, forceCookie: boolean): void => {
	const value = JSON.stringify(val)
	if (window.localStorage !== null && forceCookie !== true) {
		window.localStorage.setItem(key, value)
	} else {
		Cookies.set(key, value)
	}
}

export const retrieveData = (key: string, forceCookie: boolean): mixed => {
	if (window.localStorage !== null && forceCookie !== true) {
		const value = window.localStorage.getItem(key)
		return JSON.parse(value)
	}
	const value = Cookies.get(key)
	if (value) return JSON.parse(value)
	return null
}

export const removeData = (key: string, forceCookie: boolean): mixed => {}
