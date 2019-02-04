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
		flex-direction: column;
		display: inline-flex;
		min-width: 200px;
		overflow: hidden;
		flex-direction: column;
		background-color: white;
		margin-bottom: ${theme.layout.spacing.single};
		border: 1px solid;
		box-shadow: 2px 2px rgb(100, 100, 100);
		padding-bottom: 1px;
	`}
`

const PriceWrapper = styled.div`
	${({ active }) => css`
		opacity: ${active ? '1' : '0'};
		text-align: center;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	`}
`

const Variant = styled.button`
	${({ theme, active, available }) => css`
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		width: 100%;
		text-align: left;
		background-color: ${active ? theme.color.mint : ''};
		cursor: ${available ? 'pointer' : 'not-allowed'}
		border-color: black;
		margin: 0;
		display: flex;
		justify-content: space-between;
		
		&:hover {
			background-color: ${active ? theme.color.mint : theme.color.mintLight};

			${PriceWrapper} {
				opacity: 1;
			}
		}
	`};
`

const VariantTitle = styled(Header4)`
	text-align: 'center';
`

const PriceInner = styled.div`
	position: relative;
	display: inline;
`

const VariantPrice = styled(Header4)`
	${({ available }) => css`
		margin: 0;
	`};
`

const SoldOut = styled(Header6)`
	color: red;
	position: absolute;
	top: 50%;
	left: 50%;
	margin: 0;
	display: flex;
	justify-content: flex-center;
	align-items: center;
	white-space: nowrap;
	font-style: italic;
	transform: translate(-50%, -50%) skewY(-10deg);
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
						<PriceWrapper active={selectedVariant && v.id === selectedVariant.id}>
							<PriceInner>
								{v && !v.availableForSale && <SoldOut>Sold Out!</SoldOut>}
								<VariantPrice available={v && v.availableForSale}>
									{v ? `$${v.price.replace(/.00$/, '')}` : 'Pick a style'}
								</VariantPrice>
							</PriceInner>
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
