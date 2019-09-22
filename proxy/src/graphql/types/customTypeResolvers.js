// @flow
import axios from 'axios'
import md5 from 'md5'
import { config } from '../../config'

const addToMailchimp = async (email) => {
	const apiRoot = `https://${config.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0`
	const hash = md5(email)

	await axios.put(
		`${apiRoot}/lists/${config.MAILCHIMP_LIST_ID}/members/${hash}`,
		{
			email_address: email,
			status_if_new: 'subscribed',
		},
		{
			auth: {
				user: 'good-idea',
				password: config.MAILCHIMP_API_KEY,
			},
		},
	)
}

const addToShopify = async (email) => {
	const apiRoot = `https://${config.SHOPIFY_ADMIN_KEY}:${config.SHOPIFY_ADMIN_PASSWORD}@${config.SHOP_NAME}.myshopify.com/admin/api/2019-07`

	const response = await axios.get(`${apiRoot}/customers/search.json?query=${email}`)

	const existing = response.data && response.data.customers ? response.data.customers[0] : undefined
	if (existing) {
		await axios.put(`${apiRoot}/customers/${existing.id}.json`, {
			customer: {
				accepts_marketing: true,
			},
		})
	} else {
		await axios.post(`${apiRoot}/customers.json`, {
			customer: {
				email,
				accepts_marketing: true,
			},
		})
	}
}

const mcSubscribe = async (_, { input }) => {
	// const listId = config.MAILCHIMP_LIST_ID
	// const apiKey = config.MAILCHIMP_API_KEY
	// const datacenter = config.MAILCHIMP_DATACENTER
	// const adminKey = config.SHOPIFY_ADMIN_KEY
	// const adminPassword = config.SHOPIFY_ADMIN_PASSWORD
	if (!config.MAILCHIMP_LIST_ID || !config.MAILCHIMP_API_KEY || !config.MAILCHIMP_DATACENTER)
		throw new Error('Cannot subscribe email: missing configuration')
	const { email } = input

	try {
		const results = await Promise.all([addToMailchimp(email), addToShopify(email)])

		// console.log(results)
		//
		return { success: true }
	} catch (err) {
		console.log('ERRRR')
		console.warn(err.response.data)
		return {
			success: false,
			errorMessages: [err.response.data.title, err.response.data.detail],
		}
	}
}

const resolvers = {
	Mutation: {
		mcSubscribe,
	},
}

export default resolvers
