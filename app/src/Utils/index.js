// @flow

export * from './parsing'
export * from './sanity'
export * from './storage'

export const sleep = (ms: number = 1000): Promise<void> => new Promise((r) => setTimeout(r, ms))
