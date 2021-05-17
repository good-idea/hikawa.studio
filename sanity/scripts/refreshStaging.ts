import path from 'path'
import { migrate } from '@sanctucompu/sanity-graph-import'
import CreateClient from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

/**
 * This script will "refresh" the staging dataset with a selection
 * of recent documents. It will:
 *
 * - Fetch the N most recent PRODUCTION documents of the specified types
 * - Find all document references within these documents
 * - Create a list of all IDs of these documents and their references
 * - Fetch all documents from these IDs
 * - Export all documents as an ndjson file
 * - Import all of these documents to STAGING, omitting any references
 *   that are not included in the original list of IDs.
 *
 */

/**
 * Config
 */

/* Fetch the most recent documents of these types */
const DOCUMENT_TYPES = [
  ['shopifyProduct', 200],
  ['shopifyCollection', 200],
  ['homepage', 1],
  ['page', 25],
  ['siteSettings', 1],
  ['shop', 1],
]

/* The number of recent documents to fetch */
const DEFAULT_DOCUMENT_COUNT = 5

/**
 * Clients
 */

const stagingClientConfig = {
  useProjectHostname: true,
  dataset: 'staging',
  projectId: '7afit9ut',
  useCdn: false,
  apiVersion: '2021-04-01',
  token: process.env.SANITY_WRITE_TOKEN,
}

const productionClientConfig = {
  useProjectHostname: true,
  dataset: 'production',
  projectId: '7afit9ut',
  apiVersion: '2021-04-01',
  useCdn: false,
}

const main = async () => {
  /* Get the most recent documents for each type */
  const initialQueries = DOCUMENT_TYPES.map(([type, count]) => ({
    query: `
      *[_type == $type && !(_id in path('drafts.**'))]
      | order(_createdAt desc) [0...$count]
    `,
    params: { type, count: count || DEFAULT_DOCUMENT_COUNT },
  }))

  await migrate({
    source: {
      clientConfig: productionClientConfig,
      initialQueries,
    },
    destination: {
      clientConfig: stagingClientConfig,
    },
  })
}

main()
