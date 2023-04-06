import { useState, type FC, type PropsWithChildren } from 'react'
import { BoardContext, defaultBoardContextData, useHours } from './hooks'
import { type BoardContextFunctions, type BoardContextData, type BoardContextValue } from './types'
import { getDraggingState } from './utilities'
import { type Card } from '@/types'
import { CHILD_GROUP_ROW_HEAD, HOUR_WIDTH, PARENT_GROUP_ROW_HEAD } from './constants'

interface BoardProviderProps extends PropsWithChildren {
  defaultStart: number
  defaultEnd: number
  onCardChange?: (card: Card) => void
}

export const BoardProvider: FC<BoardProviderProps> = ({
  children,
  defaultStart = 0,
  defaultEnd = 24,
  onCardChange
}) => {
  const [state, setState] = useState<BoardContextData>(() => ({
    ...defaultBoardContextData,
    duration: [defaultStart, defaultEnd]
  }))

  const hours = useHours(state.duration[0], state.duration[1])
  const hoursWidth = hours.length * HOUR_WIDTH
  const width = PARENT_GROUP_ROW_HEAD + CHILD_GROUP_ROW_HEAD + hoursWidth

  const functions: BoardContextFunctions = {
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

  const contextValue: BoardContextValue = {
    ...state,
    ...functions,
    hours,
    width
  }

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  )
}
