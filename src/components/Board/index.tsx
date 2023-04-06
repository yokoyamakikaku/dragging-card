import { type FC } from 'react'
import { type ParentGroup, type Card, type ChildGroup } from '@/types'

import { BoardProvider } from './provider'
import { useBoardPack } from './hooks'
import BoardContainer from './BoardContainer'
import BoardTimeRuler from './BoardTimeRuler'
import BoardDeck from './BoardDeck'
import BoardParentRowGroup from './BoardParentRowGroup'

interface BoardProps {
  defaultStart?: number
  defaultEnd?: number
  cards: Record<string, Card>
  childGroups: Record<string, ChildGroup>
  parentGroups: Record<string, ParentGroup>
  onCardChange?: (card: Card) => void
}

const Board: FC<BoardProps> = ({
  defaultStart = 0,
  defaultEnd = 24,
  parentGroups, childGroups, cards,
  onCardChange
}) => {
  const board = useBoardPack(parentGroups, childGroups, cards)

  return (
    <BoardProvider
      defaultStart={defaultStart}
      defaultEnd={defaultEnd}
      onCardChange={onCardChange}>
      <BoardContainer
        deck={<BoardDeck cards={board.noGroupCards} />}>
        <BoardTimeRuler />
        {board.parentGroups.map(parentGroup => (
          <BoardParentRowGroup
            key={parentGroup.id}
            parentGroup={parentGroup} />
        ))}
      </BoardContainer>
    </BoardProvider>
  )
}

export default Board
