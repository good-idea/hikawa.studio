// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { QueryRenderProps } from 'react-apollo'

export type LoadingState = 'loading' | 'refetching' | 'passivelyRefetching' | 'fetchingMore' | 'ready' | 'errors' | 'pending'

type Edge<T> = {
	cursor: string,
	node: T,
}

export type Paginated<T> = {
	pageInfo: {
		hasNextPage: boolean,
		hasPreviousPage: boolean,
	},
	edges: Array<Edge<T>>,
}

type LoadingProps = QueryRenderProps<any> & {
	status: LoadingState,
}

export type QueryProps = {
	query?: DocumentNode,
	children: (QueryRenderProps<any, any>) => React.Node,
	variables?: {},
	// pollInterval?: number
	// fetchPolicy?: '..'
	// errorPolicy?: ''
	delay?: boolean,
	displayName?: string,
	skip?: boolean,
	// An optional "Loading" component, with default. Use a skeleton here. Pass 'false' to disable
	LoadingComponent?: false | React.ComponentType<LoadingProps>,
	// An optional "Error" component, with default. Pass 'false' to disable
	ErrorComponent?: false | React.ComponentType<any>,
}

export const defaultQueryProps = {
	displayName: 'Query',
	variables: {},
	skip: false,
	// context: Record
}

type MutationOptions = {
	variables: {},
	// refetchQueries:
	// optimisticResponse:
	// update:
}

export type Mutation = (options?: MutationOptions) => Promise<void>
