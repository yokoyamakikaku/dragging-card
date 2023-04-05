import { type Card, type CardGroup } from '../../types'
import { getDefaultData } from './data'
import { type StoreState } from './types'

const KEY = 'STORE'

export function parseCard (data: any) {
  const id = data?.id
  if (typeof id !== 'string') throw Error('Invalid id')
  const groupId = data?.groupId
  if (typeof groupId !== 'string') throw Error('Invalid groupId')
  const startHour = data?.startHour
  if (typeof startHour !== 'number') throw Error('Invalid startHour')
  const endHour = data?.endHour
  if (typeof endHour !== 'number') throw Error('Invalid endHour')
  const label = data?.label
  if (typeof label !== 'string') throw Error('Invalid label')
  const card: Card = { id, groupId, label, startHour, endHour }
  return card
}

export function parseCardGroup (data: any) {
  const id = data?.id
  if (typeof id !== 'string') throw Error('Invalid id')
  const label = data?.label
  if (typeof label !== 'string') throw Error('Invalid label')
  const group: CardGroup = { id, label }
  return group
}

export function getStoreFromLocalStorage () {
  const json = localStorage.getItem(KEY)
  if (json === null) throw Error('No local data')

  const cards: Record<string, Card> = {}
  const groups: Record<string, CardGroup> = {}

  const data = JSON.parse(json)
  if (typeof data.cards === 'object') {
    for (const record of Object.values(data)) {
      try {
        const card = parseCard(record)
        cards[card.id] = card
      } catch {
        continue
      }
    }
  }
  if (typeof data.groups === 'object') {
    for (const record of Object.values(data)) {
      try {
        const group = parseCardGroup(record)
        groups[group.id] = group
      } catch {
        continue
      }
    }
  }
  const state: StoreState = { cards, groups }
  return state
}

export function getDefaultStore () {
  const { cards, groups } = getDefaultData()
  return {
    cards,
    groups
  }
}

export function setStoreToLocalStorage ({
  cards, groups
}: {
  cards: Record<string, Card>
  groups: Record<string, CardGroup>
}) {
  try {
    const json = JSON.stringify({ cards, groups })
    localStorage.setItem(KEY, json)
  } catch (error: any) {
    console.warn('Faild to set store to local storage')
    console.warn(error)
  }
}
