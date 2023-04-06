import { type Card, type ChildGroup, type ParentGroup } from '@/types'
import { type BoardParentRowGroup, type BoardPack, type BoardChildRowGroup, type BoardCard } from './types'

export function getBoardPack (
  parentGroups: Record<string, ParentGroup>,
  childGroups: Record<string, ChildGroup>,
  cards: Record<string, Card>
) {
  const rowId = (() => {
    let count = 0
    return () => `row-${count++}`
  })()

  const indexedBoardParentGroups: Record<string, BoardParentRowGroup> = {}
  const indexedBoardChildGroups: Record<string, BoardChildRowGroup> = {}
  const noGroupCards: BoardCard[] = []

  for (const { id, label } of Object.values(parentGroups).sort((a, b) => a.id > b.id ? 1 : -1)) {
    const parentGroup: BoardParentRowGroup = {
      id,
      label,
      rowCount: 0,
      children: []
    }
    indexedBoardParentGroups[id] = parentGroup
  }

  for (const { id, label, parentId } of Object.values(childGroups).sort((a, b) => a.id > b.id ? 1 : -1)) {
    const boardParentGroup = indexedBoardParentGroups[parentId]
    if (boardParentGroup == null) continue

    const childGroup: BoardChildRowGroup = { id, label, rows: [] }
    indexedBoardChildGroups[childGroup.id] = childGroup
    boardParentGroup.children.push(childGroup)
  }

  for (const card of Object.values(cards).sort((a, b) => a.startHour > b.startHour ? 1 : -1)) {
    if (card.groupId == null) {
      noGroupCards.push(card)
      continue
    }

    const boardChildGroup = indexedBoardChildGroups[card.groupId]
    if (boardChildGroup == null) continue

    for (let r = 0; r <= boardChildGroup.rows.length; r++) {
      const row = boardChildGroup.rows[r]
      if (row == null) {
        boardChildGroup.rows[r] = {
          id: rowId(),
          groupId: card.groupId,
          cards: [card]
        }
        break
      }

      const lastCard = row.cards[row.cards.length - 1]
      if (
        lastCard != null &&
        card.startHour < lastCard.endHour
      ) continue

      row.cards.push(card)
      break
    }
  }

  const boardParentGroups = Object.values(indexedBoardParentGroups)
  for (const boardParentGroup of boardParentGroups) {
    let rowCount = 0
    for (const childBoardGroup of boardParentGroup.children) {
      rowCount += childBoardGroup.rows.length
    }
    boardParentGroup.rowCount = rowCount
  }

  const board: BoardPack = {
    noGroupCards,
    parentGroups: boardParentGroups
  }

  return board
}
