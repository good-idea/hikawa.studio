// @flow

import styled from 'styled-components'

const Grid = styled.div`
	${({ columns, theme }) => `
		display: grid;
		margin: ${theme.layout.spacing.single} 0;
		grid-column-gap: ${theme.layout.spacing.single};
		grid-row-gap: ${theme.layout.spacing.single};
		grid-template-columns: ${!columns || typeof columns === 'number' ? '1fr '.repeat(Math.ceil(columns) || 3) : columns};
		& > * {
			min-width: 0;
		}
	`};
`

export default Grid
