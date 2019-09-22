// @flow
const axios = require('axios')
const md5 = require('md5')

const mcSubscribe = async (_, { input }) => {
	const listId = process.env.MAILCHIMP_LIST_ID
	const apiKey = process.env.MAILCHIMP_API_KEY
	const datacenter = process.env.MAILCHIMP_DATACENTER
	if (!listId || !apiKey || !datacenter) throw new Error('Cannot subscribe email: missing configuration')
	const { email } = input

	const apiRoot = `https://${datacenter}.api.mailchimp.com/3.0`
	const hash = md5(email)
	try {
		await axios.put(
			`${apiRoot}/lists/${listId}/members/${hash}`,
			{
				email_address: email,
				status_if_new: 'subscribed',
			},
			{
				auth: {
					user: 'good-idea',
					password: apiKey,
				},
			},
		)

		return { success: true }
	} catch (err) {
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
