import { type FC } from 'react'
import { RxDragHandleDots2 } from 'react-icons/rx'
import classNames from 'classnames'

import { type Card } from '@/types'

import { CARD_END_GUTTER, HOUR_WIDTH, ROW_HEIGHT } from './constants'

interface ListCardProps {
  card: Card
  dragged?: boolean
  onMoveStart?: (card: Card) => void
  onChangeStartHourStart?: (card: Card) => void
  onChangeEndHourStart?: (card: Card) => void
}

const ListCard: FC<ListCardProps> = ({
  card,
  dragged = false,
  onChangeEndHourStart,
  onChangeStartHourStart,
  onMoveStart
}) => {
  const { endHour, label, startHour } = card
  const length = endHour - startHour
  const width = length * HOUR_WIDTH - CARD_END_GUTTER
  const left = startHour * HOUR_WIDTH
  const top = 0
  const height = ROW_HEIGHT - CARD_END_GUTTER

  return (
      <div
        className={
          classNames('p-1 bg-blue-500 border-white rounded text-white text-xs absolute select-none', {
            'outline outline-2 outline-white': dragged
          })
        }
        style={{ width, left, top, height }}>
        <div
          onMouseDown={() => {
            if (onChangeStartHourStart == null) return
            onChangeStartHourStart(card)
          }}
          className="bg-blue-600 flex items-center justify-center rounded-l w-2 h-full absolute left-0 top-0 bottom-0 cursor-col-resize text-xs">
          <RxDragHandleDots2 />
        </div>
        <div
          onMouseDown={() => {
            if (onMoveStart == null) return
            onMoveStart(card)
          }}
          className="absolute left-2 right-2 p-1 top-0 bottom-0 cursor-move text-ellipsis overflow-hidden whitespace-nowrap">
          <span className="mr-1">{label}</span>
          <span className="text-blue-200">({startHour}-{endHour})</span>
        </div>
        <div
          onMouseDown={() => {
            if (onChangeEndHourStart == null) return
            onChangeEndHourStart(card)
          }}
          className="bg-blue-600 flex items-center justify-center rounded-r w-2 h-full absolute right-0 top-0 bottom-0 cursor-col-resize text-xs">
          <RxDragHandleDots2 />
        </div>
      </div>
  )
}

export default ListCard
