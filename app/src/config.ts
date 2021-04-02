const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const authToken = process.env.SANITY_AUTH_TOKEN
const shopName = process.env.SHOPIFY_SHOP_NAME
const accessToken = process.env.SHOPIFY_STOREFRONT_TOKEN

const sanityGraphQLurl = process.env.SANITY_GRAPHQL_URL

const shopifyGraphQLurl = `https://${shopName}.myshopify.com/api/2020-01/graphql`

if (!projectId) throw new Error('You must provide a sanity project ID')
if (!dataset) throw new Error('You must provide a sanity dataset')
if (!authToken) throw new Error('You must provide a sanity auth token')
if (!shopName) throw new Error('You must provide a shopify shop name')
if (!accessToken) throw new Error('You must provide a shopify access token')

export const config = {
  sanity: {
    projectId,
    dataset,
    authToken,
    graphQLurl: sanityGraphQLurl,
  },
  shopify: {
    shopName,
    accessToken,
    graphQLurl: shopifyGraphQLurl,
  },
}
