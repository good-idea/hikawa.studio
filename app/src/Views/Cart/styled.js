// @flow
import styled, { css } from 'styled-components'

export const CartGrid = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-column-gap: 15px;

		${theme.media.queries.tablet`
			grid-template-columns: repeat(5, 1fr);
		`}
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
