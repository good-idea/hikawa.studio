// @flow
import styled, { css } from 'styled-components'

const Main = styled.main`
	${({ theme, isHomepage }) => css`
		background-color: ${isHomepage ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)'};
		transition: 1s;
		padding: ${theme.layout.navHeight} ${theme.layout.spacing.triple} ${theme.layout.spacing.triple};
		min-height: 90vh;

		${theme.media.queries.phone`
			padding: ${theme.layout.navHeight} ${theme.layout.spacing.single} ${theme.layout.spacing.triple};
		`}
	`}
`

export default Main
