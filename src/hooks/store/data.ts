import { floorHourByQuarter } from '../../services/time'
import { type Card, type ChildGroup, type ParentGroup } from '../../types'

const DEFAULT_GROUPED_CARD_COUNT = 200

function getGroupedCardCount () {
  try {
    const searchParams = new URL(window.location.toString()).searchParams
    const c = searchParams.get('c')
    const count = Math.floor(Number(c))
    if (count < 0) throw Error()
    return count
  } catch {
    return DEFAULT_GROUPED_CARD_COUNT
  }
}

const GROUPED_CARD_COUNT = getGroupedCardCount()
console.log(GROUPED_CARD_COUNT)
const NO_GROUP_CARD_COUNT = 10
const CARD_PER_CHILD = 10
const CHILD_PER_PARENT = 14

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

export function getRandomCardLabel () {
  return getRandomLabel()
}
export function getRandomChildGroupLabel () {
  return getRandomLabel()
}
export function getRandomParentGroupLabel () {
  return getRandomLabel()
}

export function getId (prefix: string, index: number, degit: number = 4) {
  const zeros = new Array(degit).fill('0').join('')
  const number = `${zeros}${index}`.slice(-degit)
  return `${prefix}${number}`
}

export function setItemToIndex <T extends { id: string }> (item: T, indexed: Record<string, T>) {
  indexed[item.id] = item
}

export function getCard (id: string, groupId: string | null, label: string, startHour: number, duration: number, isValid: boolean = true) {
  const card: Card = {
    id,
    groupId,
    label,
    startHour,
    endHour: startHour + duration,
    isValid
  }
  return card
}

export function getChildGroup (id: string, label: string, parentId: string) {
  const childGroup: ChildGroup = {
    id,
    label,
    parentId
  }
  return childGroup
}

export function getParentGroup (id: string, label: string) {
  const parentGroup: ParentGroup = {
    id,
    label
  }
  return parentGroup
}

export function getDefaultData () {
  const cards: Record<string, Card> = {}
  const childGroups: Record<string, ChildGroup> = {}
  const parentGroups: Record<string, ParentGroup> = {}

  const card = getCard
  const childGroup = getChildGroup
  const parentGroup = getParentGroup
  const set = setItemToIndex

  for (let c = 1; c <= GROUPED_CARD_COUNT; c++) {
    const id = getId('card-', c)
    const childGroupId = getId('group-', Math.floor(c / CARD_PER_CHILD) + 1)
    const start = floorHourByQuarter(Math.random() * 20)
    const duration = floorHourByQuarter(Math.random() * 3) + 1
    set(card(id, childGroupId, getRandomCardLabel(), start, duration, Math.random() > 0.2), cards)

    if (childGroups[childGroupId] != null) continue

    const parentGroupId = getId('parent-group-', Math.floor(c / (CARD_PER_CHILD * CHILD_PER_PARENT)) + 1)
    set(childGroup(childGroupId, getRandomChildGroupLabel(), parentGroupId), childGroups)

    if (parentGroups[parentGroupId] != null) continue
    set(parentGroup(parentGroupId, getRandomParentGroupLabel()), parentGroups)
  }

  for (let c = 0; c < NO_GROUP_CARD_COUNT; c++) {
    const id = getId('no-group-card-', c)
    const start = Math.floor(Math.random() * 16)
    const duration = Math.floor(Math.random() * 3) + 1
    set(card(id, null, getRandomCardLabel(), start, duration, Math.random() > 0.2), cards)
  }

  return { parentGroups, childGroups, cards }
}
