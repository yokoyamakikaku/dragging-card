import { type CardGroup, type Card } from '../../types'

const CARD_COUNT = 200
const NO_GROUP_CARD_COUNT = 2

const labels: string[] = [
  'Carefully',
  'Golden',
  'Monkey',
  'Drive',
  'Teacher',
  'Given',
  'Apart',
  'Movement',
  'Character',
  'Think',
  'Member',
  'Ordinary',
  'Forget',
  'However',
  'Straw',
  'Being',
  'Center',
  'Managed',
  'Taste',
  'Whatever',
  'Nearer',
  'Write',
  'Needle',
  'Cause',
  'Relationship'
]

export function getRandomLabel () {
  return [
    labels[Math.floor(Math.random() * labels.length)],
    labels[Math.floor(Math.random() * labels.length)]
  ].join(' ')
}

export function getId (prefix: string, index: number, degit: number = 4) {
  const zeros = new Array(degit).fill('0').join('')
  const number = `${zeros}${index}`.slice(-degit)
  return `${prefix}${number}`
}

export function setItemToIndex <T extends { id: string }> (item: T, indexed: Record<string, T>) {
  indexed[item.id] = item
}

export function getCard (id: string, groupId: string | null, label: string, startHour: number, duration: number) {
  const card: Card = {
    id,
    groupId,
    label,
    startHour,
    endHour: startHour + duration
  }
  return card
}

export function getCardGroup (id: string, label: string) {
  const group: CardGroup = {
    id, label
  }
  return group
}

export function getDefaultData () {
  const cards: Record<string, Card> = {}
  const groups: Record<string, CardGroup> = {}

  const card = getCard
  const group = getCardGroup
  const set = setItemToIndex

  for (let c = 1; c <= CARD_COUNT; c++) {
    const id = getId('card-', c)
    const groupId = getId('group-', Math.floor(c / 20) + 1)
    const start = Math.floor(Math.random() * 16)
    const duration = Math.floor(Math.random() * 3) + 1
    set(card(id, groupId, getRandomLabel(), start, duration), cards)

    if (typeof (groups[groupId] as CardGroup | undefined) !== 'undefined') continue
    set(group(groupId, getRandomLabel()), groups)
  }

  for (let c = 0; c < NO_GROUP_CARD_COUNT; c++) {
    const id = getId('no-group-card-', c)
    const start = Math.floor(Math.random() * 16)
    const duration = Math.floor(Math.random() * 3) + 1
    set(card(id, null, getRandomLabel(), start, duration), cards)
  }

  return { cards, groups }
}
