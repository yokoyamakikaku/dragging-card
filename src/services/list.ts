import { type CardGroup, type Card, type CardGroupRow, type CardRow } from '@/types'

export function getCardRowGroupsFromCards (
  cards: Record<string, Card>,
  groups: Record<string, CardGroup>
) {
  let rowId = 1
  const groupRows: Record<string, CardGroupRow> = {}

  for (const group of Object.values(groups)) {
    const groupRow: CardGroupRow = {
      id: group.id,
      label: group.label,
      rows: []
    }
    groupRows[groupRow.id] = groupRow
  }

  const cardsArray: Card[] = []
  for (const card of Object.values(cards)) {
    cardsArray.push(card)
  }
  const sortedCardsArray = cardsArray.sort((a, b) => a.startHour > b.startHour ? 1 : -1)
  for (const card of sortedCardsArray) {
    if (card.groupId === null) continue
    if (groupRows[card.groupId] == null) continue

    const groupRow = groupRows[card.groupId]

    for (let r = 0; r <= groupRow.rows.length; r++) {
      const row = groupRow.rows[r] as (CardRow | undefined)
      if (row == null) {
        groupRow.rows[r] = {
          id: `row-${rowId++}`,
          groupId: card.groupId,
          cards: [card]
        }
        break
      }

      const lastCard = row.cards[row.cards.length - 1]
      if (lastCard == null || lastCard.endHour <= card.startHour) {
        row.cards.push(card)
        break
      }
    }
  }

  const groupRowsArray = Object.values(groupRows)
  const sortedGroupRowsArray = groupRowsArray.sort((a, b) => a.id > b.id ? 1 : -1)
  return sortedGroupRowsArray
}
