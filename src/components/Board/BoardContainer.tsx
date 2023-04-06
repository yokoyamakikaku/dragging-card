import { type FC, type PropsWithChildren, type ReactNode } from 'react'

interface BoardContainerProps extends PropsWithChildren {
  deck: ReactNode
}

const BoardContainer: FC<BoardContainerProps> = ({ children, deck }) => {
  return (
    <div className="flex">
      <div>
        {children}
      </div>
      {deck}
    </div>
  )
}

export default BoardContainer
