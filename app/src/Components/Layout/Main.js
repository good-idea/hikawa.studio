// @flow
import styled, { css } from 'styled-components'

const Main = styled.main`
	${({ theme, isHomepage }) => css`
		background-color: ${isHomepage ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)'};
		transition: 1s;
		padding: 0;
		min-height: 90vh;
		position: relative;

		${theme.media.queries.phone`
			padding: 30vh ${theme.layout.spacing.single} ${theme.layout.spacing.triple};
		`}
	`}
`

export default Main
