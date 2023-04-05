import { type CardGroupRow } from '@/types'
import { type FC } from 'react'
import { GROUP_GUTTER, HOUR_WIDTH, ROW_HEAD_WIDTH, ROW_HEIGHT, Z_RULER } from './constants'
import TimeScale from './TimeScale'
import ListCardRow from './ListCardRow'

interface ListCardGroupRowProps {
  groupRow: CardGroupRow
  hours: number[]
}

const ListCardGroupRow: FC<ListCardGroupRowProps> = ({ groupRow, hours }) => {
  const hoursWidth = hours.length * HOUR_WIDTH
  const width = ROW_HEAD_WIDTH + hoursWidth
  const height = groupRow.rows.length * ROW_HEIGHT + GROUP_GUTTER

  return (
    <div className="flex relative" style={{ width, height }}>
      <div className="border-r border-b bg-white sticky left-0 flex items-center justify-center" style={{ width: ROW_HEAD_WIDTH, zIndex: Z_RULER }}>
        <div className="text-center text-sm sticky top-0">{groupRow.label}</div>
      </div>
      <div className="relative" style={{ width: hoursWidth }}>
        <TimeScale height={height} hours={hours} />
        <div className='absolute' style={{ top: GROUP_GUTTER, width: hoursWidth, height }}>
          {groupRow.rows.map((row, index) => (
            <ListCardRow key={index} row={row} hours={hours} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListCardGroupRow
