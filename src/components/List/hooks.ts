import { createContext, useContext } from 'react'
import { type ListContextValue } from './types'

export const defaultValue: ListContextValue = {
  isDragging: false,
  dragging: null,
  dragStart: () => {},
  dragEnd: () => {},
  updateDragging: () => {}
}

export const ListContext = createContext<ListContextValue>(defaultValue)

export function useDragStart () {
  const { dragStart } = useContext(ListContext)
  return dragStart
}

export function useDragEnd () {
  const { dragEnd } = useContext(ListContext)
  return dragEnd
}

export function useIsDragging () {
  const { isDragging } = useContext(ListContext)
  return isDragging
}

export function useDragging () {
  const { dragging } = useContext(ListContext)
  return dragging
}

export function useUpdateDragging () {
  const { updateDragging } = useContext(ListContext)
  return updateDragging
}
