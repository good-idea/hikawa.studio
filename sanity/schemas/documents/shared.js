const pageTitle = {
	title: 'Page Title',
	name: 'title',
	type: 'string',
}

const pageContent = {
	title: 'Page Content',
	name: 'content',
	type: 'contentBuilder',
}

const pageBanner = {
	title: 'Banner Images',
	type: 'array',
	name: 'banner',
	of: [{ type: 'imageWithAltText' }],
}

const pageSeo = {
	title: 'SEO',
	name: 'seo',
	type: 'seo-settings',
}

const pageSlug = {
	title: 'Page URI',
	name: 'slug',
	type: 'slug',
	options: {
		source: 'title',
	},
	validation: (Rule) => Rule.required(),
}

export const fields = {
	pageTitle,
	pageSlug,
	pageBanner,
	pageContent,
	pageSeo,
}

export const pageFields = Object.values(fields)
