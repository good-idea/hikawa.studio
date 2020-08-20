import gql from 'graphql-tag'

export const productPageQuery = gql`
  query ProductPageQuery($handle: String) {
    allShopifyProduct(where: { handle: { eq: $handle } }) {
      _id
      handle
    }
  }
`
