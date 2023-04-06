import { type MouseEvent, type FC } from 'react'
import { floorHourByQuarter } from '../../services/time'

import { HOUR_WIDTH, ROW_HEIGHT } from './constants'
import { useBoardContext } from './hooks'
import { type BoardRow as TBoardRow } from './types'
import BoardCard from './BoardCard'

interface BoardRowProps {
  row: TBoardRow
}

const BoardRow: FC<BoardRowProps> = ({ row }) => {
  const { hours, dragStart, dragEnd, isDragging, updateDragging, dragging } = useBoardContext()
  const width = hours.length * HOUR_WIDTH
  const height = ROW_HEIGHT

  return (
    <div className="border-b relative" style={{ width, height }}>
      {row.cards.map(card => (
        <BoardCard
          key={card.id} card={card} moveable resizable
          dragged={dragging?.original.card.id === card.id}
          onChangeStartHourStart={card => {
            dragStart({ type: 'CHANGE-START', payload: { card, rowId: row.id } })
          }}
          onMoveStart={card => {
            dragStart({ type: 'MOVE', payload: { card, rowId: row.id } })
          }}
          onChangeEndHourStart={card => {
            dragStart({ type: 'CHANGE-END', payload: { card, rowId: row.id } })
          }} />
      ))}
      {(dragging != null && dragging.current.rowId === row.id) && (
        <BoardCard card={dragging.current.card} dragging moveable />
      )}
      {isDragging && (
        <div
          onMouseUp={() => { dragEnd() }}
          onMouseMove={(event: MouseEvent<HTMLDivElement>) => {
            if ((dragging?.current) == null) return
            const target = event.target
            if (!(target instanceof HTMLElement)) return

            const targetClient = target.getBoundingClientRect()
            const x = Math.max(0, Math.min(event.clientX - targetClient.x, targetClient.width))
            const hour = floorHourByQuarter(x / HOUR_WIDTH)
            switch (dragging.type) {
              case 'MOVE': {
                const rowId = row.id
                const card = dragging.current.card
                const duration = card.endHour - card.startHour
                const halfDuration = duration / 2
                const startHour = Math.max(0, Math.min(hour - halfDuration, 24 - duration))
                const endHour = startHour + duration
                updateDragging({
                  ...dragging.current,
                  rowId,
                  card: {
                    ...card,
                    groupId: row.groupId,
                    startHour,
                    endHour
                  }
                })
                return
              }
              case 'CHANGE-START': {
                const card = dragging.current.card
                const endHour = card.endHour
                const startHour = Math.max(0, Math.min(hour, endHour - 0.25))
                updateDragging({
                  ...dragging.current,
                  card: {
                    ...card,
                    startHour
                  }
                })
                return
              }
              case 'CHANGE-END': {
                const card = dragging.current.card
                const startHour = card.startHour
                const endHour = Math.max(startHour + 0.25, Math.min(hour, 24))
                updateDragging({
                  ...dragging.current,
                  card: {
                    ...card,
                    endHour
                  }
                })
              }
            }
          }}
          className='absolute'
          style={{ width, height }} />
      )}
    </div>
  )
}

export default BoardRow
