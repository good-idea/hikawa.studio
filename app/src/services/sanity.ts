import createSanityClient from '@sanity/client'
import { Document } from '../types'
import { config } from '../config'

const { sanity } = config
const { projectId, dataset, authToken } = sanity

export const sanityClient = createSanityClient({
  apiVersion: '2020-04-25',
  projectId,
  dataset,
  token: authToken, // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
  useProjectHostname: true,
})
