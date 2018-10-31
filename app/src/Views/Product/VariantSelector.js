// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ProductVariant } from 'Types/ProductTypes'
import { Header4 } from 'Components/Type'

const Outer = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.double} 0;
	`};
`

const Table = styled.div`
	border: 1px solid darkGray;
	border-radius: 8px;
	overflow: hidden;
	background-color: white;
	display: inline-block;
`

const Variant = styled.button`
	${({ theme, active }) => `
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background-color: ${active ? 'lightGray' : ''};
		
		&:hover {
			background-color: ${active ? 'lightGray' : 'whiteSmoke'}
		}

		& + button {
			border-top: 1px solid darkGray;
		}
	`};
`

const VariantTitle = styled(Header4)`
	margin-right: 2em;
`
const VariantPrice = styled(Header4)``

/**
 * VariantSelector
 */

type Props = {
	variants: Array<ProductVariant>,
	selectVariant: (string) => () => void,
	selectedVariant?: string,
}

const VariantSelector = ({ variants, selectVariant, selectedVariant }: Props) => {
	return (
		<Outer>
			<Table>
				{variants.map((v) => (
					<Variant key={v.id} active={v.id === selectedVariant} onClick={selectVariant(v.id)}>
						<VariantTitle>{v.title}</VariantTitle>
						<VariantPrice>${v.price.replace(/.00$/, '')}</VariantPrice>
					</Variant>
				))}
			</Table>
		</Outer>
	)
}

VariantSelector.defaultProps = {
	selectedVariant: undefined,
}

export default VariantSelector
