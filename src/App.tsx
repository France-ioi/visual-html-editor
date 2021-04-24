import BlocksToolbox from './features/blocks/BlocksToolbox'
import {useAppSelector} from "./hooks"

function App() {
  const categories = useAppSelector(state => state.blocksCategoryReducer.categories)

  return (
    <div className="App">
      <BlocksToolbox categories={categories}/>
    </div>
  )
}

export default App