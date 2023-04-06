import { type DragAction, type DraggingState } from './types'

export function getDraggingState (action: DragAction) {
  const { type, payload: { card, rowId } } = action

  const dragging: DraggingState = {
    type,
    current: {
      card: { ...card },
      rowId
    },
    original: {
      card: { ...card },
      rowId
    }
  }

  return dragging
}
