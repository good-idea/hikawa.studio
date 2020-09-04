import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useAnalytics, useCheckout, useSiteSettings } from '../../providers'
import { Heading } from '../Text'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { RichText } from '../RichText'
import {
  SummaryWrapper,
  LineItems,
  Centered,
  ModalInputWrapper,
  CheckoutTextWrapper,
} from './styled'
import { CartLineItem } from './CartLineItem'
import { CartSummary } from './CartSummary'
import { NoteInput } from './NoteInput'

const { useState } = React

interface CheckoutRichTextWrapperProps {
  children?: React.ReactNode
}
const CheckoutRichTextWrapper = ({
  children,
}: CheckoutRichTextWrapperProps) => (
  <Heading level={5} color="darkGray" fontWeight="300">
    {children}
  </Heading>
)

export const CartModal = () => {
  const { siteSettings } = useSiteSettings()
  const {
    addNote,
    currentCheckout,
    isOpen,
    closeCart,
    updateQuantity,
    loading,
    userErrors,
  } = useCheckout()
  const { sendBeginCheckout } = useAnalytics()

  const [lineItems] = unwindEdges(currentCheckout?.lineItems)

  const [noteInputValue, setNoteInputValue] = useState<string>(
    currentCheckout?.note ?? '',
  )

  const handleCheckoutClick = async () => {
    if (!currentCheckout) {
      alert("You don't have a cart! How did this happen?")
      return
    }
    if (noteInputValue !== currentCheckout?.note) await addNote(noteInputValue)
    if (!lineItems.length) return
    const products = lineItems
      .map((li) => {
        const { variant, quantity } = li
        if (!variant || !variant?.product) {
          return null
        }
        const { product } = variant

        return {
          variant,
          product,
          quantity,
        }
      })
      .filter(Boolean)
    // @ts-ignore
    sendBeginCheckout(products)

    window.location = currentCheckout.webUrl
  }

  const checkoutText = siteSettings?.checkout?.textRaw ?? undefined

  const updateLineItemQuantity = (lineItemId: string) => (quantity: number) =>
    updateQuantity(lineItemId, quantity)

  console.log(userErrors)
  return (
    <Modal open={isOpen} onBackgroundClick={closeCart}>
      <SummaryWrapper isLoading={loading}>
        {currentCheckout && lineItems.length ? (
          <>
            <Heading level={1}>Your Tote</Heading>
            <LineItems>
              {lineItems &&
                lineItems.map((l) => (
                  <CartLineItem
                    key={l.id}
                    item={l}
                    updateQuantity={updateLineItemQuantity(l.id)}
                  />
                ))}
            </LineItems>
            <CartSummary checkout={currentCheckout} />
            <ModalInputWrapper>
              <NoteInput
                noteInputValue={noteInputValue}
                setNoteInputValue={setNoteInputValue}
              />
              {checkoutText ? (
                <CheckoutTextWrapper>
                  <RichText
                    body={checkoutText}
                    blockWrapper={CheckoutRichTextWrapper}
                  />
                </CheckoutTextWrapper>
              ) : null}
            </ModalInputWrapper>

            {userErrors.length
              ? userErrors.map((error) => (
                  <Heading
                    level={5}
                    key={error}
                    textAlign="center"
                    color="red"
                    fontWeight="normal"
                  >
                    {error}
                  </Heading>
                ))
              : null}

            <Centered>
              <Button
                borderWidth="3px"
                borderColor="offset"
                m="0 auto"
                disabled={Boolean(userErrors.length)}
                onClick={handleCheckoutClick}
              >
                Continue to Checkout
              </Button>
            </Centered>
          </>
        ) : (
          <Heading level={3} textAlign="center">
            Your Tote is empty{' '}
            <span role="img" aria-label="sad">
              😢
            </span>
          </Heading>
        )}
        <Centered>
          <Button level={2} onClick={closeCart}>
            Keep Shopping
          </Button>
        </Centered>
      </SummaryWrapper>
    </Modal>
  )
}
