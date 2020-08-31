export interface AddLineItem {
  variantId: string
  quantity: number
}

export interface UpdateCheckoutArgs {
  lineItems?: AddLineItem[]
  email?: string
  note?: string
}
