import {
  ShopifyStorefrontProductVariant as Variant,
  ShopifyStorefrontProduct as Product,
  ShopifyStorefrontCheckoutLineItem as CheckoutLineItem,
} from '../../types/generated-shopify'
import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceProduct,
  ShopifySourceProductVariant,
} from '../../types'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export interface SelectedProduct {
  product: ShopifyProduct | ShopifySourceProduct | Product | CheckoutLineItem
  variant?: ShopifyProductVariant | ShopifySourceProductVariant | Variant
  quantity?: number
}

export interface EcommerceObject {
  name: string
  id: string
  price: string
  category?: string
  variant?: string
  list?: string
  position?: number
  quantity?: number
}

export enum EventType {
  Impressions = 'productImpressions',
  ProductClick = 'productClick',
  ProductDetailView = 'productDetail',
  AddToCart = 'productAddToCart',
  RemoveFromCart = 'productRemoveFromCart',
  BeginCheckout = 'productBeginCheckout',
  PageView = 'pageView',
}

interface ImpressionEvent {
  event: EventType.Impressions
  ecommerce: {
    impressions: EcommerceObject[]
  }
}

interface ProductClickEvent {
  event: EventType.ProductClick
  ecommerce: {
    products: EcommerceObject[]
  }
}

interface ProductDetailEvent {
  event: EventType.ProductDetailView
  ecommerce: {
    products: EcommerceObject[]
  }
}

interface AddToCartEvent {
  event: EventType.AddToCart
  ecommerce: {
    add: {
      products: EcommerceObject[]
    }
  }
}

interface RemoveFromCartEvent {
  event: EventType.RemoveFromCart
  ecommerce: {
    remove: {
      products: EcommerceObject[]
    }
  }
}

interface BeginCheckoutEvent {
  event: EventType.BeginCheckout
  ecommerce: {
    checkout: {
      products: EcommerceObject[]
    }
  }
}

interface PageViewEvent {
  event: EventType.PageView
  url: string
}

export type GTagEvent =
  | ImpressionEvent
  | ProductClickEvent
  | ProductDetailEvent
  | AddToCartEvent
  | RemoveFromCartEvent
  | BeginCheckoutEvent
  | PageViewEvent
