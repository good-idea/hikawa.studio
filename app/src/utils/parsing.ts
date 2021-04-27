import { Hero, Maybe } from '../types'

interface ParsedUrl {
  url: string
  origin: string
  pathname: string
  search: string
}

const regEx = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/

export function definitely<T>(items?: Maybe<T>[] | null): T[] {
  if (!items) return []
  return items.reduce<T[]>(
    (acc, item) => (item && item !== undefined ? [...acc, item] : acc),
    [],
  )
}

export const parsePrice = (price: string | number): string => {
  const [dollars, parsedCents] = price.toString().split('.')
  const cents = parsedCents ? `${parsedCents}0`.substr(0, 2) : false
  return cents && /[1-9]/.test(cents) ? `$${dollars}.${cents}` : `$${dollars}`
}

export const assertExists = <T>(
  item: Maybe<T> | undefined,
  label: string,
): T => {
  if (!item) {
    throw new Error(`Property "${label}" was not supplied`)
  }
  return item
}

export const isValidHero = (hero?: Hero | null): boolean => {
  if (!hero) return false
  return Boolean(
    hero?.heroSlides?.length &&
      hero?.heroSlides[0] &&
      hero?.heroSlides[0].images?.length,
  )
}

export function arrayify<T>(i: T | T[]): T[] {
  return Array.isArray(i) ? i : [i]
}

export function split<T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  return arr.reduce<[T[], T[]]>(
    ([valid, invalid], currentItem) => {
      const isValid = predicate(currentItem)
      if (isValid) {
        return [[...valid, currentItem], invalid]
      }
      return [valid, [...invalid, currentItem]]
    },
    [[], []],
  )
}
