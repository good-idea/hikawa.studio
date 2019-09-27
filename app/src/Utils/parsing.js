// @flow

type ParsedUrl = {
	url: string,
	origin: string,
	pathname: string,
	search: string,
}

const regEx = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/

// https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
export const parseUrl = (url: string): ParsedUrl | null => {
	const matches = regEx.exec(url)
	if (!matches) return null
	return {
		url,
		origin: matches[4],
		pathname: matches[5],
		search: matches[6],
		input: matches.input,
	}
}

export const parsePrice = (price: string | number): string => {
	const [dollars, parsedCents] = price.toString().split('.')
	const cents = parsedCents ? `${parsedCents}0`.substr(0, 2) : false
	return cents && /[1-9]/.test(cents) ? `$${dollars}.${cents}` : `$${dollars}`
}
