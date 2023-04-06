import { type FC } from 'react'
import { GROUP_GUTTER, PARENT_GROUP_ROW_HEAD, ROW_HEIGHT, Z_RULER } from './constants'
import { type BoardParentRowGroup as TBoardParentRowGroup } from './types'
import { useBoardContext } from './hooks'
import BoardChildRowGroup from './BoardChildRowGroup'

interface BoardParentRowGroupProps {
  parentGroup: TBoardParentRowGroup
}

const BoardParentRowGroup: FC<BoardParentRowGroupProps> = ({ parentGroup }) => {
  const { width } = useBoardContext()

  const height = (
    parentGroup.rowCount * ROW_HEIGHT +
    parentGroup.children.length * GROUP_GUTTER
  )

  const { label, children } = parentGroup

  return (
    <div className="flex relative" style={{ width, height }}>
      <div
        className="border-r border-b bg-white sticky flex items-center justify-center"
        style={{
          left: 0,
          width: PARENT_GROUP_ROW_HEAD,
          zIndex: Z_RULER
        }}>
        <div className="text-center text-sm sticky top-0">{label}</div>
      </div>
      <div>
        {children.map(childGroup => (
          <BoardChildRowGroup
            key={childGroup.id}
            childGroup={childGroup} />
        ))}
      </div>
    </div>
  )
}

export default BoardParentRowGroup
