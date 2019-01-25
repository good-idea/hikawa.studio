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
	_key
	_type
	...on TextBlock {
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
	}
	...on VideoEmbed {
		_type
		_key
		alt
		service
		videoId
	}
	...on SanityImage {
		${sanityImageFields}
	}
`

export const heroPartial = `
	hero {
		images {
			${sanityImageFields}
		}
	}
`

export const linkPartial = `
	...on Page {
		title
		slug
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
	...on UrlLink {
		label
		url
	}
`

export const pageLinkFields = `
	_type
	_key
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
		fullWidth
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
