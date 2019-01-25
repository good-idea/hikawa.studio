// @flow

import type { ProductVariant, Money } from 'Types/ProductTypes'
import type { MailingAddress } from 'Types/CustomerTypes'

type AppliedGiftCard = {
	amountUsed: Money,
	balance: Money,
	id: string,
	lastCharacters: string,
}

type ShippingRate = {
	handle: string,
	price: Money,
	title: string,
}

type AvailableShippingRates = {
	ready: boolean,
	shippingRates: Array<ShippingRate>,
}

type Attribute = {
	key: string,
	value: string,
}

type CurrencyCode = 'USD'

type MoneyV2 = {
	amount: string,
	currencyCode: CurrencyCode,
}

type PricingPercentageValue = {
	percentage: number,
}

type PricingValue = MoneyV2 | PricingPercentageValue

export type DiscountApplication = {
	allocationMethod: 'ACROSS' | 'EACH' | 'ONE',
	targetSelection: 'ALL' | 'ENTITLED' | 'EXPLICIT',
	targetType: 'LINE_ITEM' | 'SHIPPING_LINE',
	value: PricingValue,
	code?: string,
}

type DiscountAllocation = {
	allocatedAmount: MoneyV2,
	discountApplication: DiscountApplication,
}

export type CheckoutLineItem = {
	id: string,
	quantity: number,
	title: string,
	variant: ProductVariant,
	customAttributes?: Array<Attribute>,
	discountAllocations?: Array<DiscountAllocation>,
}

export type OrderLineItem = {
	customAttributes: Array<Attribute>,
	discountAllocations: Array<DiscountAllocation>,
	quanity: number,
	title: string,
	variant: ProductVariant,
}

export type Order = {
	currencyCode: CurrencyCode,
	customerLocale: string,
	customerUrl: string,
	discountApplications: Array<DiscountAllocation>,
	email: string,
	id: string,
	lineItems: Array<OrderLineItem>,
}

export type Checkout = {
	appliedGiftCards?: Array<AppliedGiftCard>,
	availableShippingRates?: AvailableShippingRates,
	completedAt?: Date,
	createdAt?: Date,
	currencyCode?: CurrencyCode,
	customAttributes?: Array<Attribute>,
	discountApplications?: Array<DiscountApplication>,
	email?: string,
	id: string,
	lineItems: Array<CheckoutLineItem>,
	note?: string,
	order?: Order,
	orderStatusUrl?: string | null,
	paymentDue?: Money,
	ready?: boolean,
	requiresShipping?: boolean,
	shippingAddress?: MailingAddress,
	shippingDiscountAllocations?: Array<DiscountAllocation>,
	shippingLine?: ShippingRate,
	subtotalPrice?: Money,
	taxExempt?: boolean,
	taxesIncluded?: boolean,
	totalPrice?: Money,
	totalTax?: Money,
	updatedAt?: Date,
	webUrl?: string,
}
