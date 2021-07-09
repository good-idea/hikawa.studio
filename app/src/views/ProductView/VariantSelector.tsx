import * as React from 'react'
import { useSiteSettings } from '../../providers'
import { ShopifySourceProductVariant } from '../../types'
import { Heading } from '../../components/Text'
import {
  VariantSelectorWrapper,
  Table,
  PriceWrapper,
  VariantButton,
  PriceInner,
  SoldOutWrapper,
} from './styled'
import { SoldOut } from '../../components/Badges'

interface VariantSelectorProps {
  variants: ShopifySourceProductVariant[]
  currentVariant: ShopifySourceProductVariant
  selectVariant: (id: string) => void
}

const parsePrice = (v: ShopifySourceProductVariant): string | undefined => {
  const amount = v?.priceV2?.amount
  if (!amount) return
  return ['$', amount.replace(/\.00?/, '')].join('')
}

export const VariantSelector = ({
  variants,
  currentVariant,
  selectVariant,
}: VariantSelectorProps) => {
  const { siteSettings } = useSiteSettings()
  const handleSelectVariant = (v: ShopifySourceProductVariant) => () => {
    if (!v.availableForSale) return
    if (!v.id) {
      throw new Error('This variant was not supplied with an ID')
    }
    selectVariant(v.id)
  }
  return (
    <VariantSelectorWrapper>
      <Table>
        {variants.map((v) => (
          <VariantButton
            key={v.id || 'some-key'}
            active={currentVariant && v.id === currentVariant.id}
            available={Boolean(v.availableForSale)}
            onClick={handleSelectVariant(v)}
            highlight={
              siteSettings.highlight ? siteSettings.highlight.rgb : undefined
            }
          >
            <Heading level={4}>{v.title}</Heading>
            <PriceWrapper active={currentVariant && v.id === currentVariant.id}>
              <PriceInner>
                {!v.availableForSale ? (
                  <SoldOutWrapper>
                    <SoldOut />
                  </SoldOutWrapper>
                ) : null}
                <Heading opacity={v.availableForSale ? 1 : 0} ml={3} level={4}>
                  {parsePrice(v) || 'Pick a style'}
                </Heading>
              </PriceInner>
            </PriceWrapper>
          </VariantButton>
        ))}
      </Table>
    </VariantSelectorWrapper>
  )
}
