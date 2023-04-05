import { type FC } from 'react'
import { HOUR_WIDTH } from './constants'

interface TimeScaleProps {
  height: number
  hours: number[]
}

const TimeScale: FC<TimeScaleProps> = ({ hours, height }) => {
  return (
    <div className="absolute">
      {hours.map((hour, index) => {
        const width = HOUR_WIDTH
        const left = index * HOUR_WIDTH
        const top = 0
        return (
          <div
            key={hour}
            style={{ width, left, top, height }}
            className='border-r absolute' />
        )
      })}
    </div>
  )
}

export default TimeScale
