import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
	${({ theme }) => css`
		margin-top: -${theme.layout.spacing.double};
		margin-bottom: ${theme.layout.spacing.single};
		min-height: 46px;

		.afterpay-logo-link {
			display: block;
			margin-top: 2px;
		}
		img {
			display: inline;
		}
	`}
`

const { useEffect, useRef } = React

export const Afterpay = ({ price }) => {
	const containerRef = useRef()

	useEffect(() => {
		if (!containerRef.current || typeof presentAfterpay === 'undefined') return
		const dataContainer = document.querySelector('#afterpay-container')
		if (dataContainer && dataContainer.querySelector('p.afterpay-paragraph'))
			dataContainer.querySelector('p.afterpay-paragraph').remove()

		try {
			const apiConfig = {
				priceSelector: '#afterpay-container > span',
				locale: 'en_US',
				currency: 'USD',
				afterpayLogoColor: 'color',
				amount: parseFloat(price, 10) * 100,
				minMaxThreshold: {
					min: 3500,
					max: 100000,
				},
			}
			//
			/* eslint-disable-next-line */
			new presentAfterpay(apiConfig).init()
		} catch (err) {
			console.log(err)
		}
	}, [price, containerRef])

	return (
		<Wrapper ref={containerRef} id="afterpay-container">
			<span />
		</Wrapper>
	)
}
