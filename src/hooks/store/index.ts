import { type Reducer, useReducer } from 'react'
import { type StoreAction, type StoreState } from './types'
import { getDefaultStore } from './utilities'

const initialState: StoreState = {
  cards: {},
  parentGroups: {},
  childGroups: {}
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
    case 'CHILD-GROUP/DELETE': {
      const { id } = action.payload
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.childGroups[id]
      return {
        ...state,
        childGroups: { ...state.childGroups }
      }
    }
    case 'CHILD-GROUP/PUT': {
      const { childGroup } = action.payload
      state.childGroups[childGroup.id] = childGroup
      return {
        ...state,
        childGroups: { ...state.childGroups }
      }
    }
    case 'PARENT-GROUP/DELETE': {
      const { id } = action.payload
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.parentGroups[id]
      return {
        ...state,
        parentGroups: { ...state.parentGroups }
      }
    }
    case 'PARENT-GROUP/PUT': {
      const { parentGroup } = action.payload
      state.parentGroups[parentGroup.id] = parentGroup
      return {
        ...state,
        parentGroups: { ...state.parentGroups }
      }
    }
  }
}

const initializer = () => {
  return getDefaultStore()
}

export function useStore () {
  const [state, dispatch] = useReducer(reducer, initialState, initializer)

  return { state, dispatch }
}
