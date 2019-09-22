// @flow

// TODO, make this an acutal enum that matches the schema
type CountryCode = string

export type MailingAddress = {
	address1: string,
	address2: string,
	city: string,
	country: string,
	countryCodeV2: CountryCode,
	firstName: string,
	formatted: Array<String>,
	formattedArea: string,
	id: string,
	lastName: string,
	latitude: number,
	longitude: number,
	name: string,
	phone: string,
	provice: string,
	provinceCOde: string,
	zip: string,
}
