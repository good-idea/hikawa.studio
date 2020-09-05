import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ShopifyProduct, ShopifySourceProductVariant } from '../../types'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Button } from '../../components/Button'
import { useCheckout, useSiteSettings } from '../../providers'
import { ShopifyRichText } from '../../components/ShopifyRichText'
import { Afterpay } from './Afterpay'
import { VariantSelector } from './VariantSelector'
import { SuccessMessage } from './SuccessMessage'
import { definitely } from '../../utils'
import { KlaviyoForm } from './KlaviyoForm'
import {
  ProductDescriptionTitle,
  ExtraDescription,
  ButtonContainer,
  ProductDescriptionWrapper,
  VariantWrapper,
} from './styled'

const { useState } = React

interface ProductDescriptionProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
  selectVariant: (id: string) => void
  addToCart: () => Promise<void>
}

export const ProductDescription = ({
  product,
  currentVariant,
  selectVariant,
  addToCart,
}: ProductDescriptionProps) => {
  const { siteSettings } = useSiteSettings()
  const [success, setSuccess] = useState(false)
  const { loading: checkoutLoading } = useCheckout()
  const extraProductText = siteSettings?.product?.textRaw
  const { klaviyoFormID, title } = product

  const [variants] = unwindEdges(product?.sourceData?.variants)

  const handleClick = async () => {
    await addToCart()
    setSuccess(true)
  }

  const tags = product?.sourceData?.tags ?? []

  const soldOutText = definitely(tags)
    .map((t) => t.toLowerCase())
    .includes('comingsoon')
    ? 'Coming Soon'
    : 'Currently Unavailable'

  const soldOut = product.sourceData?.availableForSale === false

  const buttonText = soldOut ? soldOutText : 'Add to Tote'

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
            onClick={handleClick}
            disabled={
              checkoutLoading ||
              !Boolean(currentVariant) ||
              !currentVariant.availableForSale
            }
          >
            {buttonText}
          </Button>
          <SuccessMessage visible={success} />
        </ButtonContainer>
        {klaviyoFormID ? <KlaviyoForm formId={klaviyoFormID} /> : null}
      </VariantWrapper>
    </ProductDescriptionWrapper>
  )
}
