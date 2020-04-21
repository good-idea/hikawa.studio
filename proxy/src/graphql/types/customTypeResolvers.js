// @flow
import axios from 'axios'
import md5 from 'md5'

const addToMailchimp = async (email) => {
	const apiRoot = `https://${process.env.MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0`
	const hash = md5(email)

	await axios.put(
		`${apiRoot}/lists/${process.env.MAILCHIMP_LIST_ID}/members/${hash}`,
		{
			email_address: email,
			status_if_new: 'subscribed',
		},
		{
			auth: {
				user: 'good-idea',
				password: process.env.MAILCHIMP_API_KEY,
			},
		},
	)
}

const addToShopify = async (email) => {
	const apiRoot = `https://${process.env.SHOPIFY_ADMIN_KEY}:${process.env.SHOPIFY_ADMIN_PASSWORD}@${process.env.SHOP_NAME}.myshopify.com/admin/api/2019-07`

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
	// const listId = process.env.MAILCHIMP_LIST_ID
	// const apiKey = process.env.MAILCHIMP_API_KEY
	// const datacenter = process.env.MAILCHIMP_DATACENTER
	// const adminKey = process.env.SHOPIFY_ADMIN_KEY
	// const adminPassword = process.env.SHOPIFY_ADMIN_PASSWORD
	if (!process.env.MAILCHIMP_LIST_ID || !process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_DATACENTER)
		throw new Error('Cannot subscribe email: missing configuration')
	const { email } = input

	try {
		await Promise.all([addToMailchimp(email), addToShopify(email)])
		return { success: true }
	} catch (err) {
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
