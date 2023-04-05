import { type CardRow } from '@/types'
import { type MouseEvent, type FC } from 'react'
import { HOUR_WIDTH, ROW_HEIGHT } from './constants'
import ListCard from './ListCard'
import { useIsDragging, useDragStart, useDragging, useUpdateDragging, useDragEnd } from './hooks'

interface ListCardRowProps {
  row: CardRow
  hours: number[]
}

const ListCardRow: FC<ListCardRowProps> = ({ hours, row }) => {
  const width = hours.length * HOUR_WIDTH
  const height = ROW_HEIGHT
  const dragStart = useDragStart()
  const dragEnd = useDragEnd()

  const isDragging = useIsDragging()
  const dragging = useDragging()
  const updateDragging = useUpdateDragging()

  return (
    <div className="border-b relative" style={{ width, height }}>
      {row.cards.map(card => (
        <ListCard
          key={card.id} card={card}
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
        <ListCard card={dragging.current.card} dragged />
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
            switch (dragging.type) {
              case 'MOVE': {
                const rowId = row.id
                const card = dragging.current.card
                const duration = card.endHour - card.startHour
                const halfDuration = duration / 2
                const centerHour = x / HOUR_WIDTH
                const flooredCenterQuatorHour = Math.round(centerHour * 4)
                const roundedCenterHour = flooredCenterQuatorHour / 4
                const startHour = Math.max(0, Math.min(roundedCenterHour - halfDuration, 24 - duration))
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
                const hour = x / HOUR_WIDTH
                const flooredQuatorHour = Math.round(hour * 4)
                const roundedHour = flooredQuatorHour / 4
                const startHour = Math.max(0, Math.min(roundedHour, endHour - 0.25))
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
                const hour = x / HOUR_WIDTH
                const flooredQuatorHour = Math.round(hour * 4)
                const roundedHour = flooredQuatorHour / 4
                const endHour = Math.max(startHour + 0.25, Math.min(roundedHour, 24))
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

export default ListCardRow
