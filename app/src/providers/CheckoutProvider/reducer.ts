import { useReducer } from 'react'
import { ShopifyStorefrontCheckout } from '../../types'

interface State {
  isOpen: boolean
  loading: boolean
  userErrors: string[]
  currentCheckout?: ShopifyStorefrontCheckout
}

enum ActionType {
  Fetching = 'FETCHING',
  Open = 'OPEN',
  Close = 'CLOSE',
  Success = 'Success',
  Error = 'Error',
}

interface FetchingAction {
  type: ActionType.Fetching
}

interface SuccessAction {
  type: ActionType.Success
  checkout?: ShopifyStorefrontCheckout
}

interface ErrorAction {
  type: ActionType.Error
  userErrors: any[]
}

interface OpenAction {
  type: ActionType.Open
}

interface CloseAction {
  type: ActionType.Close
}

type Action =
  | FetchingAction
  | OpenAction
  | CloseAction
  | SuccessAction
  | ErrorAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Open:
      return {
        ...state,
        isOpen: true,
      }
    case ActionType.Close:
      return {
        ...state,
        isOpen: false,
      }
    case ActionType.Fetching:
      return {
        ...state,
        loading: true,
      }
    case ActionType.Success:
      return {
        ...state,
        userErrors: [],
        loading: false,
        currentCheckout: action.checkout,
      }
    case ActionType.Error:
      return {
        ...state,
        userErrors: action.userErrors,
        loading: false,
      }
  }
}

const initialState = {
  loading: false,
  isOpen: false,
  userErrors: [],
}

export const useCheckoutReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const startFetch = () => dispatch({ type: ActionType.Fetching })
  const openCart = () => dispatch({ type: ActionType.Open })
  const closeCart = () => dispatch({ type: ActionType.Close })
  const onSuccess = (checkout?: ShopifyStorefrontCheckout) =>
    dispatch({ type: ActionType.Success, checkout })
  const onError = (userErrors: string[]) =>
    dispatch({ type: ActionType.Error, userErrors })

  return {
    state,
    openCart,
    startFetch,
    closeCart,
    onSuccess,
    onError,
  }
}
