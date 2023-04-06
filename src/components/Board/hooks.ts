import { createContext, useContext, useMemo } from 'react'
import { type BoardContextData, type BoardContextValue } from './types'
import { type ParentGroup, type Card, type ChildGroup } from '@/types'
import { getBoardPack } from './services'

export const defaultBoardContextData: BoardContextData = {
  duration: [0, 0],
  isDragging: false,
  dragging: null
}

export const defaultContextValue: BoardContextValue = {
  ...defaultBoardContextData,
  hours: [],
  width: 0,
  dragStart: () => {},
  dragEnd: () => {},
  updateDragging: () => {}
}

export const BoardContext = createContext<BoardContextValue>(defaultContextValue)

export function useBoardContext () {
  return useContext(BoardContext)
}

export function useBoardPack (
  parentGroups: Record<string, ParentGroup>,
  childGroups: Record<string, ChildGroup>,
  cards: Record<string, Card>
) {
  return useMemo(() => {
    const board = getBoardPack(parentGroups, childGroups, cards)
    return board
  }, [parentGroups, childGroups, cards])
}

export function useHours (start: number, end: number) {
  const hours = useMemo(() => {
    const hours: number[] = []
    for (let hour = Math.floor(start); hour < Math.ceil(end); hour++) hours.push(hour)
    return hours
  }, [start, end])
  return hours
}
