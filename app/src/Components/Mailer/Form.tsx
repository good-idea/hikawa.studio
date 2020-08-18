import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Button } from '../Button'
import { Input } from '../Forms'
import { Heading } from '../Text'
import { Sentry } from '../../services/sentry'
import { setCookie, VIEWER_EMAIL } from '../../utils'

const { useReducer } = React

interface FormProps {
  isLoading?: boolean
}

const Form = styled.form<FormProps>`
  ${({ isLoading }) => css`
    opacity: ${isLoading ? '0.3' : '1'};
    pointer-events: ${isLoading ? 'none' : ''};
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3 0;
  `}
`

/**
 * MailerForm
 */

interface State {
  email: string
  loading: boolean
  success: boolean | void
  errorMessage?: string
}

const initialState: State = {
  email: '',
  loading: false,
  success: undefined,
  errorMessage: undefined,
}

enum ActionType {
  START = 'START',
  SUCCESS = 'SUCCESS',
  CHANGE = 'CHANGE',
  ERROR = 'ERROR',
}

interface StartAction {
  type: ActionType.START
}
interface SuccessAction {
  type: ActionType.SUCCESS
}
interface ChangeAction {
  type: ActionType.CHANGE
  email: string
}
interface ErrorAction {
  type: ActionType.ERROR
  errorMessage: string
}

type Action = StartAction | SuccessAction | ChangeAction | ErrorAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.START:
      return {
        ...state,
        loading: true,
        success: undefined,
        errorMessage: undefined,
      }
    case ActionType.CHANGE:
      return {
        ...state,
        email: action.email,
      }

    case ActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errorMessage: undefined,
      }
    case ActionType.ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errorMessage: action.errorMessage,
      }
    default:
      // @ts-ignore
      throw new Error(`"${action.type}" is not a valid action type`)
  }
}

export const MailerForm = () => {
  const [{ loading, success, errorMessage, email }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    dispatch({ type: ActionType.CHANGE, email })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: ActionType.START })
    setCookie(VIEWER_EMAIL, email)
    const response = await fetch('/api/klaviyo', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }).then((r) => r.json())
    const { statusCode } = response
    if (statusCode === 200) {
      dispatch({ type: ActionType.SUCCESS })
    } else {
      Sentry.configureScope((scope) => {
        scope.setExtra('status', response.status)
        scope.setExtra('statusText', response.statusText)
        scope.setExtra('email', email)
      })
      Sentry.captureException(response.error)
      const errorMessage = response.error.message
      dispatch({ type: ActionType.ERROR, errorMessage })
    }
  }

  return (
    <Form onSubmit={handleSubmit} isLoading={loading}>
      <Input
        disabled={Boolean(success)}
        onChange={handleChange}
        type="email"
        name="email"
        value={email}
      />

      {errorMessage ? (
        <Heading level={5} color="red">
          {errorMessage}
        </Heading>
      ) : null}
      {success === undefined ? <Button type="submit">Submit</Button> : null}
    </Form>
  )
}
