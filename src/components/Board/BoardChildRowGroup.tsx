import { type FC } from 'react'

import { type BoardChildRowGroup as TBoardChildRowGroup } from './types'
import { CHILD_GROUP_ROW_HEAD, GROUP_GUTTER, HOUR_WIDTH, PARENT_GROUP_ROW_HEAD, ROW_HEIGHT, Z_RULER } from './constants'
import { useBoardContext } from './hooks'
import BoardRowTimeScale from './BoardRowTimeScale'
import BoardRow from './BoardRow'

interface BoardChildRowGroupProps {
  childGroup: TBoardChildRowGroup
}

const BoardChildRowGroup: FC<BoardChildRowGroupProps> = ({ childGroup }) => {
  const { hours } = useBoardContext()
  const hoursWidth = hours.length * HOUR_WIDTH
  const width = CHILD_GROUP_ROW_HEAD + hoursWidth
  const height = GROUP_GUTTER + childGroup.rows.length * ROW_HEIGHT

  const { label, rows } = childGroup

  return (
    <div className="flex relative" style={{ width, height }}>
      <div
        className="border-r border-b bg-white sticky flex items-center justify-center"
        style={{
          left: PARENT_GROUP_ROW_HEAD,
          width: CHILD_GROUP_ROW_HEAD,
          zIndex: Z_RULER
        }}>
        <div className="text-center text-sm sticky top-0">{label}</div>
      </div>
      <div className="relative" style={{ width: hoursWidth }}>
        <BoardRowTimeScale height={height} />
        <div className='absolute' style={{ top: GROUP_GUTTER, width: hoursWidth, height }}>
          {rows.map((row, index) => (
            <BoardRow key={index} row={row} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardChildRowGroup
