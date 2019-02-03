// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { ProductVariant } from 'Types/ContentTypes'
import { Header4, Header6 } from 'Components/Type'

const Outer = styled.div`
	${({ theme }) => css`
		margin: ${theme.layout.spacing.double} 0;

		${theme.media.queries.phone`
			text-align: center;
		`}
	`};
`

const Table = styled.div`
	${({ theme }) => css`
		border: 4px solid ${theme.color.offset};
		border-radius: 8px;
		overflow: hidden;
		background-color: white;
		display: inline-flex;
		flex-direction: column;
		min-width: 250px;
	`}
`

const Variant = styled.button`
	${({ theme, active, available }) => css`
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		width: 100%;
		text-align: center;
		background-color: ${active ? theme.color.offsetLight : ''};
		cursor: ${available ? 'pointer' : 'not-allowed'}
		
		&:hover {
			background-color: ${active ? theme.color.offsetLight : 'whiteSmoke'}
		}

		& + button {
			border-top: 1px solid #e0e0e0;
		}
	`};
`

const VariantTitle = styled(Header4)`
	text-align: 'center';
`

const PriceWrapper = styled.div`
	${({ theme }) => css`
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		width: 100%;
		text-align: center;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: ${theme.color.offset};
	`}
`

const PriceInner = styled.div`
	position: relative;
	display: inline;
`

const VariantPrice = styled(Header4)`
	${({ theme, available }) => `
		margin: 0;
		color: ${available ? 'inherit' : theme.color.middleGray};
	`};
`

const SoldOut = styled(Header6)`
	color: red;
	position: absolute;
	top: 0;
	left: 100%;
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
					</Variant>
				))}
				<PriceWrapper>
					<PriceInner>
						{selectedVariant && !selectedVariant.availableForSale && <SoldOut>Sold Out!</SoldOut>}
						<VariantPrice available={selectedVariant && selectedVariant.availableForSale}>
							{selectedVariant ? `$${selectedVariant.price.replace(/.00$/, '')}` : 'Pick a style'}
						</VariantPrice>
					</PriceInner>
				</PriceWrapper>
			</Table>
		</Outer>
	)
}

VariantSelector.defaultProps = {
	selectedVariant: undefined,
}

export default VariantSelector
