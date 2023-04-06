import { type HTMLAttributes, type FC } from 'react'
import { RxDragHandleDots2 } from 'react-icons/rx'
import classNames from 'classnames'

import { type Card } from '@/types'

import { CARD_END_GUTTER, HOUR_WIDTH, ROW_HEIGHT } from './constants'

type ResizeHandleProps = {
  position: 'start' | 'end'
} & HTMLAttributes<HTMLDivElement>

const ResizeHandle: FC<ResizeHandleProps> = ({ position, ...props }) => {
  return (
    <div className={classNames(
      'text-xs bg-opacity-20 bg-black text-white flex items-center justify-center w-2 h-full absolute top-0 bottom-0 cursor-col-resize',
      {
        'start-0 rounded-s': position === 'start',
        'end-0 rounded-e': position === 'end'
      }
    )} {...props}>
      <RxDragHandleDots2 />
    </div>
  )
}

interface BoardCardProps {
  card: Card
  dragging?: boolean
  resizable?: boolean
  moveable?: boolean
  dragged?: boolean
  stacked?: boolean
  onMoveStart?: (card: Card) => void
  onChangeStartHourStart?: (card: Card) => void
  onChangeEndHourStart?: (card: Card) => void
}

const BoardCard: FC<BoardCardProps> = ({
  card,
  dragging = false,
  moveable = false,
  resizable = false,
  dragged = false,
  stacked = false,
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
        style={{
          width: stacked ? 'auto' : width,
          height,
          left: stacked ? 0 : left,
          top: stacked ? 0 : top
        }}
        className={classNames(
          'p-1 rounded text-xs select-none text-white border-white',
          {
            absolute: !stacked,
            relative: stacked,
            'bg-blue-500 text-white': card.isValid,
            'bg-red-500 text-white': !card.isValid,
            'opacity-50': dragged,
            'outline outline-2 outline-white': dragging
          }
        )}>
        <div
          onMouseDown={() => {
            if (!moveable) return
            if (onMoveStart == null) return
            onMoveStart(card)
          }}
          className={classNames(
            'absolute p-1 top-0 bottom-0 text-ellipsis overflow-hidden whitespace-nowrap',
            {
              'start-2 end-2': resizable,
              'start-0 end-0': !resizable,
              'cursor-move': moveable
            }
          )}>
          <span className="mr-1">{label}</span>
          <span className="opacity-60">({startHour}-{endHour})</span>
        </div>
        {resizable && (
          <>
            <ResizeHandle position='start' onMouseDown={() => {
              if (onChangeStartHourStart == null) return
              onChangeStartHourStart(card)
            }} />
            <ResizeHandle position='end' onMouseDown={() => {
              if (onChangeEndHourStart == null) return
              onChangeEndHourStart(card)
            }} />
          </>
        )}
      </div>
  )
}

export default BoardCard
