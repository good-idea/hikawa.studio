// @flow

import styled from 'styled-components'

const Grid = styled.div`
	${({ columns }) => `
		display: grid;
		grid-column-gap: 10px;
		grid-row-gap: 10px;
		grid-template-columns: ${!columns || typeof columns === 'number' ? '1fr'.repeat(Math.ceil(columns) || 3) : columns};
		& > * {
			min-width: 0;
		}
	`};
`

export default Grid
