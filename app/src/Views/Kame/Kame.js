// @flow
import React from 'react'
import Query from 'GraphQL/Query'
import type { ContentBlocks, Image } from 'Types/SharedTypes'
import Block from 'Components/ContentBlocks'
import Banner from 'Components/Banner'
import Logo from 'Components/Logo'
import homepageQuery from './homepageQuery'
/**
 * Kame
 */

type Props = {
	homepage: {
		content: ContentBlocks,
		banner: Image,
	},
}

const Kame = ({ siteSettings, homepage }: Props) => {
	console.log()
	return (
		<React.Fragment>
			<Logo />
			<Banner src={homepage.banner.url} alt={siteSettings.seo.description} />
			{homepage.content && homepage.content.map((block) => <Block key={block._key} {...block} />)}
		</React.Fragment>
	)
}

export default () => <Query query={homepageQuery}>{({ data }) => <Kame {...data} />}</Query>
