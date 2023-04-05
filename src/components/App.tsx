import { type FC } from 'react'
import { useStore } from '../hooks/store'
import List from './List'

const App: FC = () => {
  const { state: { cards, groups }, dispatch } = useStore()
  return (
    <List
      cards={cards}
      onCardChange={card => { dispatch({ type: 'CARD/PUT', payload: { card } }) }}
      groups={groups}
      />
  )
}

export default App
