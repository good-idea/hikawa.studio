// @flow

const imageFields = `
	_type
	_key
	_ref
	url
	id
`

export const seoPartial = `
	seo {
		name
		description
		image {
			${imageFields}
		}
	}
`

const richTextFields = `
	blocks {
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
	}
`

const pageLinkFields = `
	label
	caption
	image {
		${imageFields}
	}
	link {
		...on Page {
			title
			slug
			banner {
				${imageFields}
			}
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
	}
`

export const bannerPartial = `
	banner {
		${imageFields}
	}
`

export const contentPartial = `
	content {
		_type
		_key
		...on SanityImage {
			${imageFields}
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
