// @flow
import { merge } from 'lodash'
import { productSchema, productResolvers } from '../GraphQl/Product'
import { collectionSchema, collectionResolvers } from '../GraphQl/Collection'
import { homepageSchema, homepageResolvers } from '../GraphQl/Homepage'
import { pageSchema, pageResolvers } from '../GraphQl/Page'
import { settingsSchema, settingsResolvers } from '../GraphQl/SiteSettings'
import { shopSchema, shopResolvers } from '../GraphQl/Shop'
import { sharedTypeDefs } from '../GraphQl/sharedTypes'
import { customTypeDefs } from '../GraphQl/customTypeDefs'
import customTypeResolvers from '../GraphQl/customTypeResolvers'
import { sharedResolvers } from '../GraphQl/sharedTypeResolvers'

export const typeDefs = [
	//
	productSchema,
	shopSchema,
	collectionSchema,
	homepageSchema,
	pageSchema,
	settingsSchema,
	sharedTypeDefs,
	customTypeDefs,
].join('\n')

export const resolvers = merge(
	//
	{},
	productResolvers,
	shopResolvers,
	collectionResolvers,
	homepageResolvers,
	pageResolvers,
	settingsResolvers,
	sharedResolvers,
	customTypeResolvers,
)
