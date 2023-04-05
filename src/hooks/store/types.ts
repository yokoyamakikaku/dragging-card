import { type Card, type CardGroup } from '../../types'

export interface StoreState {
  cards: Record<string, Card>
  groups: Record<string, CardGroup>
}

export type StoreAction = {
  type: 'CARD/PUT'
  payload: {
    card: Card
  }
} | {
  type: 'CARD/DELETE'
  payload: {
    id: string
  }
} | {
  type: 'GROUP/PUT'
  payload: {
    group: CardGroup
  }
} | {
  type: 'GROUP/DELETE'
  payload: {
    id: string
  }
}
