// @flow
import { css } from 'styled-components'

const breakpoints = {
	desktop: 992,
	tablet: 768,
	phone: 576,
}

// Iterate through the sizes and create a media template
export const queries = Object.keys(breakpoints).reduce((acc, label) => {
	acc[label] = (...args: any) => css`
		@media (max-width: ${breakpoints[label] / 16}em) {
			${css(...args)}
		}
	`

	return acc
}, {})

console.log(queries)
