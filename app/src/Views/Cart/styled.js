// @flow
import styled from 'styled-components'

export const CartGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 15px;
`

export const CartGridSegment = styled.div`
	${({ align, span }) => `
		display: flex;
		flex-direction: column;
		align-items: ${align || 'flex-start'};
		justify-content: center;
		grid-column: ${span ? `span ${span}` : ''};
	`};
`

export const CartLineItemWrapper = styled(CartGrid)`
	${({ theme }) => `
		padding: ${theme.layout.spacing.singleHalf} 0;
		border-bottom: 1px solid black;

		&:first-child {
			border-top: 1px solid black;
		}
	`};
`
