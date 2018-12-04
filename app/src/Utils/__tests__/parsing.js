/* eslint-disable no-undef */

import { parsePrice } from '../parsing'

describe('[parsePrice]', () => {
	it('Correctly parses shopify price strings', () => {
		const prices = [
			// [input, expected]
			['100.00', '$100'],
			['100.000', '$100'],
			['100.001', '$100'],
			['100.021', '$100.02'],
			['100.011', '$100.01'],
			['5.00', '$5'],
			['5.50', '$5.50'],
			['0.50', '$0.50'],
			['1000', '$1000'],
			['1000.00', '$1000'],
			['1234.56', '$1234.56'],
			['1234.567', '$1234.56'],
		]
		prices.forEach(([input, expected]) => {
			const result = parsePrice(input)
			expect(result).toBe(expected)
		})
	})
})
