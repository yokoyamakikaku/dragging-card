import { type FC, useMemo } from 'react'
import { useBoardContext } from './hooks'
import { type Card } from '@/types'
import { RULER_HEIGHT } from './constants'
import BoardCard from './BoardCard'

interface BoardDeckProps {
  cards: Card[]
}

const BoardDeck: FC<BoardDeckProps> = ({
  cards
}) => {
  const {
    isDragging,
    dragStart,
    dragEnd,
    dragging,
    updateDragging: update
  } = useBoardContext()

  const finalCards = useMemo(() => {
    const finalCards = [...cards]

    if (
      dragging?.type === 'MOVE' &&
      dragging.current.card.groupId === null &&
      !finalCards.some(card => card.id === dragging.current.card.id)
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
          <BoardCard
            key={card.id} card={card}
            moveable stacked
            onMoveStart={() => { dragStart({ type: 'MOVE', payload: { card, rowId: null } }) }}/>
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

export default BoardDeck
