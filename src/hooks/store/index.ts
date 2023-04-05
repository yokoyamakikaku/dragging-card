import { type Reducer, useReducer } from 'react'
import { type StoreAction, type StoreState } from './types'
import { getDefaultStore, getStoreFromLocalStorage } from './utilities'

const initialState: StoreState = {
  cards: {},
  groups: {}
}

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (action.type) {
    case 'CARD/DELETE': {
      const { id } = action.payload

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.cards[id]

      return {
        ...state,
        cards: { ...state.cards }
      }
    }
    case 'CARD/PUT': {
      const { card } = action.payload
      state.cards[card.id] = card
      return {
        ...state,
        cards: { ...state.cards }
      }
    }
    case 'GROUP/DELETE': {
      const { id } = action.payload
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.groups[id]
      return {
        ...state,
        groups: { ...state.groups }
      }
    }
    case 'GROUP/PUT': {
      const { group } = action.payload
      state.groups[group.id] = group
      return {
        ...state,
        groups: { ...state.groups }
      }
    }
  }
}

const initializer = () => {
  try {
    return getStoreFromLocalStorage()
  } catch {
    return getDefaultStore()
  }
}

export function useStore () {
  const [state, dispatch] = useReducer(reducer, initialState, initializer)

  return { state, dispatch }
}
