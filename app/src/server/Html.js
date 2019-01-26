// @flow
/* eslint-disable react/no-danger */

import React from 'react'

const Html = ({ content, initialState, styles }: { content: string, styles: string, initialState: string }) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>GitHunt</title>
			<style dangerouslySetInnerHTML={{ __html: styles }} />
		</head>
		<body>
			<div id="root" dangerouslySetInnerHTML={{ __html: content }} />
			<script
				charSet="UTF-8"
				dangerouslySetInnerHTML={{
					__html: `window.__APOLLO_STATE__=${initialState};`,
				}}
			/>
			<script src="/js/app.js" />
		</body>
	</html>
)

export default Html
