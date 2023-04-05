import { useState, type FC, useMemo } from 'react'
import TimeRuler from './TimeRuler'
import { type CardGroup, type Card, type HourDuration } from '@/types'
import { useCardGroupRows, useNoGroupCards } from '../../hooks/list'
import ListCardGroupRow from './ListCardGroupRow'
import { HOUR_WIDTH, ROW_HEAD_WIDTH } from './constants'
import { ListProvider } from './provider'
import Deck from './Deck'

interface ListProps {
  cards: Record<string, Card>
  groups: Record<string, CardGroup>
  onCardChange?: (card: Card) => void
}

const List: FC<ListProps> = ({
  cards, groups,
  onCardChange
}) => {
  const [[start, end]] = useState<HourDuration>([0, 24])
  const groupRows = useCardGroupRows(cards, groups)
  const noGroupCards = useNoGroupCards(cards)

  const hours = useMemo(() => {
    const hours: number[] = []
    for (let hour = start; hour < end; hour++) {
      hours.push(hour)
    }
    return hours
  }, [start, end])

  const hoursWidth = hours.length * HOUR_WIDTH
  const width = ROW_HEAD_WIDTH + hoursWidth

  return (
    <ListProvider onCardChange={onCardChange}>
      <div className="flex">
        <div>
          <TimeRuler width={width} hours={hours} />
          {groupRows.map(groupRow =>
            <ListCardGroupRow key={groupRow.id} groupRow={groupRow} hours={hours} />
          )}
        </div>
        <Deck cards={noGroupCards} />
      </div>
    </ListProvider>
  )
}

export default List
