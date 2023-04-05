import { useState, type FC, type PropsWithChildren } from 'react'
import { ListContext, defaultValue } from './hooks'
import { type ListContextFunctions, type ListContextData } from './types'
import { getDraggingState } from './utilities'
import { type Card } from '@/types'

interface ListProviderProps extends PropsWithChildren {
  onCardChange?: (card: Card) => void
}

export const ListProvider: FC<ListProviderProps> = ({
  children,
  onCardChange
}) => {
  const [state, setState] = useState<ListContextData>(defaultValue)

  const functions: ListContextFunctions = {
    dragStart: (action) => {
      setState(state => ({ ...state, isDragging: true, dragging: getDraggingState(action) }))

      const handleEnd = () => {
        setState(state => ({ ...state, isDragging: false, dragging: null }))
        window.removeEventListener('mouseleave', handleEnd)
        window.removeEventListener('mouseup', handleEnd)
      }

      window.addEventListener('mouseup', handleEnd, { once: true })
      window.addEventListener('mouseleave', handleEnd, { once: true })
    },
    dragEnd: () => {
      const cardState = state.dragging?.current
      if (cardState == null || (onCardChange == null)) return
      onCardChange(cardState.card)
    },
    updateDragging: (current) => {
      setState(state => {
        if (state.dragging == null) return state

        return {
          ...state,
          dragging: {
            ...state.dragging,
            current
          }
        }
      })
    }
  }

  const contextValue = {
    ...state,
    ...functions
  }

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  )
}
