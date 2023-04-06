import { type FC } from 'react'
import { HOUR_WIDTH, ROW_HEAD_WIDTH, RULER_HEIGHT, Z_RULER } from './constants'
import { useBoardContext } from './hooks'

const BoardTimeRuler: FC = () => {
  const { width, hours } = useBoardContext()

  return (
    <div className="flex sticky top-0 bg-white" style={{ width, height: RULER_HEIGHT, zIndex: Z_RULER }}>
      <div className="border-r border-b" style={{ width: ROW_HEAD_WIDTH }} />
      {hours.map(hour => (
        <div className="border-r p-1 text-xs border-b flex items-center" style={{ width: HOUR_WIDTH }} key={hour}>
          <div className="text-gray-500">{hour}:00</div>
        </div>
      ))}
    </div>
  )
}

export default BoardTimeRuler
