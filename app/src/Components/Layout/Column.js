// @flow
import styled, { css } from 'styled-components'

const Column = styled.section`
	${({ theme, width }) => css`
		margin: ${theme.layout.spacing.double} auto;
		width: calc(100% - ${theme.layout.spacing.double});
		max-width: ${theme.layout.columns[width] || theme.layout.defaults.columnWidth};
	`};
`

export default Column
