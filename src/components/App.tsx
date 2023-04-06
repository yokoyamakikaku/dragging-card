import { type FC } from 'react'
import { useStore } from '../hooks/store'
import Board from './Board'

const App: FC = () => {
  const { state: { cards, childGroups, parentGroups }, dispatch } = useStore()
  return (
    <Board
      cards={cards} childGroups={childGroups} parentGroups={parentGroups}
      onCardChange={card => { dispatch({ type: 'CARD/PUT', payload: { card } }) }} />
  )
}

export default App
