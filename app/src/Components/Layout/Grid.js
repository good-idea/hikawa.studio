// @flow

import styled from 'styled-components'

const Grid = styled.div`
	${({ columns }) => `
		display: grid;
		grid-column-gap: 10px;
		grid-row-gap: 10px;
		grid-template-columns: ${'1fr '.repeat(columns || 3)};
		& > * {
			min-width: 0;
		}
	`};
`

export default Grid
