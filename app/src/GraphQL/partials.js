// @flow

export const shopifyImageFields = `
	id
	altText
	originalSrc
`

export const sanityImageFields = `
	_type
	_key
	_ref
	url
	id
	altText
`

export const colorPartial = `
	rgb {
		r
		g
		b
		a
	}
`

export const seoPartial = `
	seo {
		name
		description
		image {
			_type
			_key
			_ref
			url
			id
		}
	}
`

export const richTextPartial = `
	_type
	style
	level
	listItem
	children {
		_type
		_key
		text
		marks
	}
	markDefs {
		_type
		_key
		href
	}
`

export const bannerPartial = `
	banner {
		${sanityImageFields}
	}
`

export const linkPartial = `
	...on Page {
		title
		slug
		${bannerPartial}
	}
	...on Product {
		id
		handle
		title
		images(first: 50) {
			edges {
				node {
					id
					altText
					originalSrc
				}
			}
			}
	}
	...on Collection {
		id
		handle
		title
		image {
			id
			altText
			originalSrc
		}
	}
`

const pageLinkFields = `
	label
	caption
	images {
		${sanityImageFields}
	}
	link {
		${linkPartial}
	}
`

export const contentPartial = `
	content {
		_type
		_key
		...on SanityImage {
			${sanityImageFields}
		}
		...on Header {
			text
		}
		...on RichText {
			blocks {
				${richTextPartial}
			}
		}
      ...on PageLink {
			${pageLinkFields}
		 }
	 }
`
