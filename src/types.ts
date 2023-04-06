export type Hour = number
export type HourDuration = [Hour, Hour]

export interface ParentGroup {
  id: string
  label: string
}

export interface ChildGroup {
  id: string
  label: string
  parentId: string
}

export interface Card {
  id: string
  label: string
  groupId: string | null
  startHour: Hour
  endHour: Hour
  isValid: boolean
}
