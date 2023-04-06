import { type ParentGroup, type Card, type ChildGroup } from '../../types'

export interface StoreState {
  parentGroups: Record<string, ParentGroup>
  childGroups: Record<string, ChildGroup>
  cards: Record<string, Card>
}

export type StoreAction = (
  {
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
    type: 'CHILD-GROUP/PUT'
    payload: {
      childGroup: ChildGroup
    }
  } | {
    type: 'CHILD-GROUP/DELETE'
    payload: {
      id: string
    }
  } | {
    type: 'PARENT-GROUP/PUT'
    payload: {
      parentGroup: ParentGroup
    }
  } | {
    type: 'PARENT-GROUP/DELETE'
    payload: {
      id: string
    }
  }
)
