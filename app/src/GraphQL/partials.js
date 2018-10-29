// @flow

export const seoPartial = `
	seo {
		name
		description
		image {
			url
		}
	}
`

export const imagePartial = `
	url
`

const richTextFields = `
	blocks {
		_type
		style
		children {
			_type
			_key
			text
			marks
		}
		markDefs {
			_type
			href
		}
	}
`

const pageLinkFields = `
	link {
		...on Page {
			title

			
		}
		...on Product {
			id
			handle
			title
		}
		...on Collection {
			id
			handle
			title
		}
	}
`

export const bannerPartial = `
	banner {
		url
		_ref
	}
`

export const contentPartial = `
	content {
		_type
		_key
		...on SanityImage {
			url
			# metadata
		}
		...on Header {
			text
		}
		...on RichText {
			${richTextFields}
		}
      ...on PageLink {
			${pageLinkFields}
		 }
	 }
`
