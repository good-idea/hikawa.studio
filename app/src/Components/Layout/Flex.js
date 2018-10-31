// @flow
import styled from 'styled-components'

export const FlexContainer = styled.div`
	${({ direction, justify, align, wrap }) => `
		display: flex;
		flex-direction: ${direction || 'row'};	
		justify-content: ${justify || 'center'};	
		align-items: ${align || 'flex-start'};
		flex-wrap: ${wrap || 'wrap'};
	`};
`

export const FlexChild = styled.div`
	${({ order, grow, shrink, basis, alignSelf }) => `
		order: ${order || 'auto'};
		flex-grow: ${grow || '0'};
		flex-shrink: ${shrink || '1'};
		flex-basis: ${basis || 'auto'};
		align-self: ${alignSelf || 'auto'};
	`};
`
