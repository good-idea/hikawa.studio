// @flow
import { merge } from 'lodash'
import { productSchema, productResolvers } from '../types/Product'
import { collectionSchema, collectionResolvers } from '../types/Collection'
import { homepageSchema, homepageResolvers } from '../types/Homepage'
import { pageSchema, pageResolvers } from '../types/Page'
import { settingsSchema, settingsResolvers } from '../types/SiteSettings'
import { shopSchema, shopResolvers } from '../types/Shop'
import { sharedTypeDefs } from '../types/sharedTypes'
import { customTypeDefs } from '../types/customTypeDefs'
import customTypeResolvers from '../types/customTypeResolvers'
import { sharedResolvers } from '../types/sharedTypeResolvers'

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
