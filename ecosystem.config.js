module.exports = {
  apps: [
    {
      name: 'baileyhikawa.com',
      script: 'yarn start',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      cron_restart: '0 */3 * * *',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        DEBUG: 'sane-shopify:server',
      },
    },
  ],

  deploy: {
    production: {
      user: 'kame',
      host: '165.232.143.243',
      ref: 'origin/main',
      repo: 'git@github.com:good-idea/hikawa.studio',
      path: '/home/kame/baileyhikawa.com',
      'post-deploy':
        'yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'development',
        SENTRY_DSN: process.env.SENTRY_DSN,
        SENTRY_ORG: process.env.SENTRY_ORG,
        SENTRY_PROJECT: process.env.SENTRY_PROJECT,
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,

        KLAVIYO_LIST_ID: process.env.KLAVIYO_LIST_ID,
        KLAVIYO_API_KEY: process.env.KLAVIYO_API_KEY,

        SANITY_AUTH_TOKEN: process.env.SANITY_AUTH_TOKEN,
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
        SANITY_DATASET: process.env.SANITY_DATASET,
        SANITY_GRAPHQL_URL: process.env.SANITY_GRAPHQL_URL,

        SHOPIFY_SHOP_NAME: process.env.SHOPIFY_SHOP_NAME,
        SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN,
        SHOPIFY_GRAPHQL_URL: process.env.SHOPIFY_GRAPHQL_URL,
      },
    },
  },
}
