import { type Card } from '@/types'

type DragType = 'CHANGE-START' | 'CHANGE-END' | 'MOVE'

export interface DragAction {
  type: DragType
  payload: {
    card: Card
    rowId: string | null
  }
}

export interface DraggingCardState {
  card: Card
  rowId: string | null
}

export interface DraggingState {
  type: DragType
  original: DraggingCardState
  current: DraggingCardState
}

export interface ListContextData {
  isDragging: boolean
  dragging: DraggingState | null
}

export interface ListContextFunctions {
  dragStart: (action: DragAction) => void
  dragEnd: () => void
  updateDragging: (current: DraggingCardState) => void
}

export type ListContextValue = ListContextData & ListContextFunctions
