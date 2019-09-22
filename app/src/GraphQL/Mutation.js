// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { FetchResult, ApolloError, DataProxy, MutationResult, MutationFunction } from 'react-apollo'
import { Mutation as ApolloMutation } from 'react-apollo'
import { unwindEdges } from './utils'



type MutationProps<Response> = {
	mutation: DocumentNode,
	children: (MutationFunction<Response>, MutationResult<Response>) => React.Node,
	variables?: {},
	update?: (DataProxy, FetchResult<any>) => void,
	ignoreResults?: boolean,
	optimisticResponse?: void | {},
	refetchQueries?: (FetchResult<any>) => Array<{ query: DocumentNode, variables?: {} }>,
	awaitRefetchQueries?: boolean,
	onCompleted?: void | ((any) => void),
	onError?: void | ((ApolloError) => void),
}

type GenericResponse = { [key: string]: any }

export const Mutation = <T: GenericResponse>({ children, ...mutationProps }: MutationProps<T>) => (
	<ApolloMutation {...mutationProps}>
		{(mutate, { data, ...response }: MutationResult<T>) => {
			const responseProps = {
				data: data ? unwindEdges(data) : data,
				...response,
			}
			return children(mutate, responseProps)
		}}
	</ApolloMutation>
)

Mutation.defaultProps = {
	variables: {},
	update: undefined,
	ignoreResults: false,
	optimisticResponse: undefined,
	refetchQueries: undefined,
	awaitRefetchQueries: false,
	onCompleted: undefined,
	onError: undefined,
}

export type MutationWrapper<Response> = (props: MutationProps<Response>) => React.Element<typeof Mutation>

export const withDefaultMutation = <T: GenericResponse>(mutation: DocumentNode, options: MutationProps<T> | {} = {}) => (
	props: any,
) => <Mutation mutation={mutation} {...options} {...props} />
