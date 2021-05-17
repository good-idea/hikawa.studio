import * as NodeSentryInitializer from '@sentry/node'
import * as BrowserSentryInitializer from '@sentry/browser'
import type { Scope } from '@sentry/browser'
import path from 'path'
import { RewriteFrames } from '@sentry/integrations'
import Debug from 'debug'

/** Some Sentry setup for sourcemaps */
// This allows TypeScript to detect our global value
declare global {
  /* eslint-disable-next-line */
  namespace NodeJS {
    interface Global {
      /* eslint-disable-next-line */
      __rootdir__: string
    }
  }
}

const rootdir = path.resolve(__dirname || process.cwd(), '..', '..')

global.__rootdir__ = rootdir

const debug = Debug('app:sentry')

const ENV = process.env.NODE_ENV
const FORCE = Boolean(process.env.FORCE_SENTRY)
const DSN = process.env.SENTRY_DSN

const SentryInitializer =
  typeof window === 'undefined'
    ? NodeSentryInitializer
    : BrowserSentryInitializer

type Event = NodeSentryInitializer.Event

export let Sentry: typeof SentryInitializer

type ScopeCallback = (scope: Scope) => void
if (ENV === 'production' || ENV === 'staging' || FORCE) {
  if (!DSN) throw new Error('No Sentry DSN supplied')
  Sentry = SentryInitializer
  Sentry.init({
    dsn: DSN,
    environment: ENV,
    integrations: [
      new RewriteFrames({
        root: global.__rootdir__,
      }),
    ],
    beforeSend: (event: Event) => {
      if (
        /* Klaviyo errors */
        /klaviyo/.test(event?.message || '') ||
        /onsite\/js/.test(event?.message || '')
      ) {
        return null
      }
      return event
    },
  })
} else {
  debug('Mocking local Sentry')
  const noop = () => undefined

  Sentry = {
    // @ts-ignore
    setUserContext: noop,
    // @ts-ignore
    requestHandler: () => (req, res, next) => next(),
    withScope: (cb: ScopeCallback) => undefined,
    parsers: {
      parseRequest: noop,
    },
    configureScope: () => undefined,
    captureException: (e: any) => {
      debug('[sentry mock] Captured exception:')
      debug(e)
      const randomId = Math.random().toString().replace('0.', '')
      return `mock-ref-${randomId}`
    },
    captureMessage: (m: string) => {
      debug('[sentry mock] Captured message:')
      debug(m)
      return m
    },
  }
}
