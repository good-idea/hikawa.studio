import { RESTDataSource } from 'apollo-datasource-rest'
import client from '../services/sanity'

/* eslint-ignore */

export class SanityDataSource extends RESTDataSource {
	client = client
}
