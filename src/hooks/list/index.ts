import { useMemo } from 'react'
import { type Card, type CardGroup } from '../../types'
import { getCardRowGroupsFromCards } from '../../services/list'

export function useCardGroupRows (
  cards: Record<string, Card>,
  groups: Record<string, CardGroup>
) {
  const groupRows = useMemo(() => {
    return getCardRowGroupsFromCards(cards, groups)
  }, [cards, groups])

  return groupRows
}

export function useNoGroupCards (
  cards: Record<string, Card>
) {
  const noGroupCards = useMemo(() => {
    const noGroupCards: Card[] = []

    for (const card of Object.values(cards)) {
      if (card.groupId != null) continue
      noGroupCards.push(card)
    }

    return noGroupCards
  }, [cards])

  return noGroupCards
}
