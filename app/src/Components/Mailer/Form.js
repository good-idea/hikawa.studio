// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'Components/Buttons'
import type { Mutation } from 'Types/GraphQLTypes'
import { Input } from 'Components/Forms'
import { Header5 } from 'Components/Type'
import { setCookie, VIEWER_EMAIL } from 'Utils/storage'
import MailerMutation from './MailerMutation'

const Form = styled.form`
	${({ isLoading }) => `
		opacity: ${isLoading ? '0.3' : '1'};
		pointer-events: ${isLoading ? 'none' : ''};
		transition: 0.2s;
	`}
`

/**
 * MailerForm
 */

type Props = {
	submit: Mutation,
}

type State = {
	email: string,
	loading: boolean,
	success: boolean,
	errors: Array<string>,
}

class MailerForm extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	inputRef = React.createRef()

	state = {
		email: '',
		loading: false,
		success: false,
		errors: [],
	}

	handleChange = () => {
		if (!this.inputRef.current) return
		const email = this.inputRef.current.value
		this.setState({
			email,
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		this.setState({ loading: true })
		const { email } = this.state
		const result = await this.props.submit({ variables: { email } })
		if (process.env.NODE_ENV === 'production') {
			setCookie(VIEWER_EMAIL, email)
		}
		setTimeout(() => {
			if (result.data.mcSubscribe.success) {
				this.setState({
					loading: false,
					success: true,
				})
			}
		}, 300)
	}

	render() {
		const { email, loading, success, errors } = this.state
		const emailValue = success ? 'Thank you!' : email
		return (
			<Form onSubmit={this.handleSubmit} isLoading={loading}>
				<Input locked={success} ref={this.inputRef} onChange={this.handleChange} type="email" name="email" value={emailValue} />
				{errors && errors.length ? errors.map((err) => <Header5 color="red">{err}</Header5>) : null}
				{!success && (
					<Button onClick={this.handleSubmit} type="submit">
						Submit
					</Button>
				)}
			</Form>
		)
	}
}

export default () => <MailerMutation>{(submit) => <MailerForm submit={submit} />}</MailerMutation>
