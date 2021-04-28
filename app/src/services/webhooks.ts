import { createNextWebhooks } from '@sane-shopify/server'
import { Sentry } from './sentry'
import { config } from '../config'

const handleError = (err: Error) => {
  Sentry.withScope((scope) => {
    scope.setTag('sane-shopify', 'server-webhook')
    Sentry.captureException(err)
  })
}

const { projectId, dataset, authToken } = config.sanity
const { shopName, accessToken } = config.shopify

const webhooksConfig = {
  secrets: {
    sanity: {
      projectId: config.sanity.projectId,
      dataset: config.sanity.dataset,
      authToken,
    },
    shopify: {
      shopName,
      accessToken,
    },
  },
  onError: handleError,
}

export const webhooks: any = createNextWebhooks(webhooksConfig)
