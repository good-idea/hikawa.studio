import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceProductVariant,
} from '../../types'
import { Heading, P } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Button } from '../../components/Button'
import { useSiteSettings } from '../../providers'
import { ShopifyRichText } from '../../components/ShopifyRichText'
import { definitely } from '../../utils'
import { Afterpay } from './Afterpay'
import { VariantSelector } from './VariantSelector'
import {
  ProductDescriptionTitle,
  ExtraDescription,
  ButtonContainer,
  ProductDescriptionWrapper,
  VariantWrapper,
} from './styled'

interface ProductDescriptionProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
  selectVariant: (id: string) => void
  addToCart: () => void
}

export const ProductDescription = ({
  product,
  currentVariant,
  selectVariant,
  addToCart,
}: ProductDescriptionProps) => {
  const { siteSettings } = useSiteSettings()
  const extraProductText = siteSettings?.product?.textRaw
  const { title } = product

  const [variants] = unwindEdges(product?.sourceData?.variants)

  return (
    <ProductDescriptionWrapper>
      <ProductDescriptionTitle>
        <Heading mb={4} level={2}>
          {title}
        </Heading>
      </ProductDescriptionTitle>
      <ShopifyRichText text={product?.sourceData?.descriptionHtml} />
      {extraProductText ? (
        <ExtraDescription>
          <RichText body={extraProductText} />
        </ExtraDescription>
      ) : null}
      <VariantWrapper>
        <VariantSelector
          variants={variants}
          selectVariant={selectVariant}
          currentVariant={currentVariant}
        />
        <Afterpay price={currentVariant.priceV2} />
        <ButtonContainer>
          <Button
            onClick={addToCart}
            disabled={
              !Boolean(currentVariant) || !currentVariant.availableForSale
            }
          >
            Add To Tote
          </Button>
        </ButtonContainer>
      </VariantWrapper>
    </ProductDescriptionWrapper>
  )
}
