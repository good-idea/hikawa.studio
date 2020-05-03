// @flow
import styled, { css } from 'styled-components'
import { Header5 } from 'Components/Type'

export const CartGrid = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-column-gap: 15px;

		${theme.media.queries.phone`
			grid-column-gap: 8px;
	
			grid-template-columns: repeat(4, 1fr) 35px;
		`}
	`}
`

export const CartGridSegment = styled.div`
	${({ align }) => `
		display: flex;
		flex-direction: column;
		align-items: ${align || 'flex-start'};
		justify-content: center;
	`};
`

export const MainSegment = styled(CartGridSegment)`
	${({ theme }) => css`
		grid-column: span 3;
	`}
`

export const CartLineItemWrapper = styled(CartGrid)`
	${({ theme }) => css`
		padding: ${theme.layout.spacing.singleHalf} 0;
		border-bottom: 1px solid black;

		&:first-child {
			border-top: 1px solid black;
		}
	`};
`

export const InputWrapper = styled.div`
	${({ theme }) => css`
		margin: ${theme.layout.spacing.double} 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 auto;
		max-width: 300px;
	`};
`
export const CheckoutTextWrapper = styled.div`
	${({ theme }) => css`
		margin-top: ${theme.layout.spacing.single};
		text-align: center;
	`}
`

export const CheckoutText = styled(Header5)`
	${({ theme }) => css`
		font-weight: 300;
		color: ${theme.color.darkGray};
	`}
`
