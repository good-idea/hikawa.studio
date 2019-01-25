// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
// import pathMatch from 'path-match'
import routes from './routes'

type QueryConfig = {
	path: string,
	query: DocumentNode,
	Component: React.ComponentType<any>,
}

export const getQueryConfigForPath = (path: string): QueryConfig | void => routes.find((r) => r.path === path)
