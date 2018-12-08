// @flow
import styled from 'styled-components'

const Main = styled.main`
	${({ theme, isHomepage }) => `
		background-color: ${isHomepage ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)'};
		transition: 1s;
		padding: ${theme.layout.navHeight} ${theme.layout.spacing.triple} ${theme.layout.spacing.triple};
	`}
`

export default Main
