// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ProductVariant } from 'Types/ProductTypes'
import { Header4, Header6 } from 'Components/Type'

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
	${({ theme, active, available }) => `
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background-color: ${active ? 'lightGray' : ''};
		cursor: ${available ? 'pointer' : 'not-allowed'}
		
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

const PriceWrapper = styled.div`
	position: relative;
`

const VariantPrice = styled(Header4)`
	${({ available }) => `
			color: ${available ? 'inherit' : 'lightgrey'}
		`};
`

const SoldOut = styled(Header6)`
	color: red;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	margin: 0;
	display: flex;
	justify-content: flex-center;
	align-items: center;
	white-space: nowrap;
	font-style: italic;
	transform: skewY(-10deg);
`

/**
 * VariantSelector
 */

type Props = {
	variants: Array<ProductVariant>,
	selectVariant: (ProductVariant) => () => void,
	selectedVariant?: ProductVariant,
}

const noop = () => {}

const VariantSelector = ({ variants, selectVariant, selectedVariant }: Props) => {
	return (
		<Outer>
			<Table>
				{variants.map((v) => (
					<Variant
						key={v.id}
						active={selectedVariant && v.id === selectedVariant.id}
						available={v.availableForSale}
						onClick={v.availableForSale ? selectVariant(v) : noop}
					>
						<VariantTitle>{v.title}</VariantTitle>
						<PriceWrapper>
							<VariantPrice available={v.availableForSale}>${v.price.replace(/.00$/, '')}</VariantPrice>
							{!v.availableForSale && <SoldOut>Sold Out!</SoldOut>}
						</PriceWrapper>
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
