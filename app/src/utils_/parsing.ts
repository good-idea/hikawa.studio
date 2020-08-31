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

// https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
export const parseUrl = (url: string): ParsedUrl | null => {
  const matches = regEx.exec(url)
  if (!matches) return null
  return {
    url,
    origin: matches[4],
    pathname: matches[5],
    search: matches[6],
  }
}

export const parsePrice = (price: string | number): string => {
  const [dollars, parsedCents] = price.toString().split('.')
  const cents = parsedCents ? `${parsedCents}0`.substr(0, 2) : false
  return cents && /[1-9]/.test(cents) ? `$${dollars}.${cents}` : `$${dollars}`
}

export const assert = <T>(arg?: T | null): T => {
  if (arg === undefined || arg === null) {
    throw new Error('Property does not exist')
  }
  return arg
}

export const isValidHero = (hero?: Hero | null): boolean => {
  if (!hero) return false
  return Boolean(hero?.images && hero.images.length)
}

export function arrayify<T>(i: T | T[]): T[] {
  return Array.isArray(i) ? i : [i]
}
