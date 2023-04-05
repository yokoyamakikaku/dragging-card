import { type FC, useMemo } from 'react'
import { useDragEnd, useDragStart, useDragging, useIsDragging, useUpdateDragging } from './hooks'
import { type Card } from '@/types'
import { CARD_HEIGHT, RULER_HEIGHT } from './constants'

interface DeckProps {
  cards: Card[]
}

const Deck: FC<DeckProps> = ({
  cards
}) => {
  const isDragging = useIsDragging()

  const dragStart = useDragStart()
  const dragEnd = useDragEnd()
  const dragging = useDragging()
  const update = useUpdateDragging()

  const finalCards = useMemo(() => {
    const finalCards = [...cards]

    if (
      dragging?.type === 'MOVE' &&
      dragging.current.card.groupId === null &&
      !finalCards.includes(dragging.current.card)
    ) {
      finalCards.push(dragging.current.card)
    }

    return finalCards
  }, [cards, dragging?.current])

  return (
    <div className="w-64 h-screen shrink-0 flex flex-col sticky top-0 right-0 bg-white border-l" style={{ zIndex: 2000 }}>
      <div className="border-b" style={{ height: RULER_HEIGHT }} />
      <div className="p-4 flex flex-col gap-3 flex-grow overflow-auto">
        {finalCards.map(card => (
          <div
            key={card.id} onMouseDown={() => { dragStart({ type: 'MOVE', payload: { card, rowId: null } }) }}
            style={{ height: CARD_HEIGHT }}
            className='bg-blue-500 text-white text-xs p-1 rounded shrink-0 cursor-move relative select-none'>
              <span className='mr-1'>{card.label}</span>
              <span className='text-blue-200'>({card.startHour} - {card.endHour})</span>
          </div>
        ))}
      </div>
      {isDragging && (
        <div
          onMouseOver={() => {
            if (dragging?.type !== 'MOVE') return
            update({
              ...dragging.current,
              rowId: null,
              card: {
                ...dragging.current.card,
                groupId: null
              }
            })
          }}
          onMouseUp={() => { dragEnd() }}
          className="absolute inset-0" style={{ zIndex: 2002 }} />
      )}
    </div>
  )
}

export default Deck
