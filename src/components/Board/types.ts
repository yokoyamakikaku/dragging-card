import { type Card } from '@/types'

export type BoardCard = Card

export interface BoardRow {
  id: string
  groupId: string
  cards: BoardCard[]
}

export interface BoardChildRowGroup {
  id: string
  label: string
  rows: BoardRow[]
}

export interface BoardParentRowGroup {
  id: string
  label: string
  children: BoardChildRowGroup[]
  rowCount: number
}

export interface BoardPack {
  parentGroups: BoardParentRowGroup[]
  noGroupCards: BoardCard[]
}

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

export interface BoardContextData {
  duration: [number, number]
  isDragging: boolean
  dragging: DraggingState | null
}

export interface BoardContextComputedData {
  width: number
  hours: number[]
}

export interface BoardContextFunctions {
  dragStart: (action: DragAction) => void
  dragEnd: () => void
  updateDragging: (current: DraggingCardState) => void
}

export type BoardContextValue = BoardContextData & BoardContextComputedData & BoardContextFunctions
