export type Hour = number
export type HourDuration = [Hour, Hour]

export interface Card {
  id: string
  label: string
  groupId: string | null
  startHour: Hour
  endHour: Hour
}

export interface CardGroup {
  id: string
  label: string
}

export interface CardRow {
  id: string
  groupId: string
  cards: Card[]
}

export interface CardGroupRow {
  id: string
  label: string
  rows: CardRow[]
}
