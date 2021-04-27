import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppSelector} from "./hooks"

function App() {
  const categories = useAppSelector(state => state.blocksReducer.categories)
  const editorConfig = useAppSelector(state => state.visualHTMLReducer.value)

  return (
    <div className="App">
      <BlocksToolbox categories={categories}/>
      <VisualHTMLEditor value={editorConfig}/>
    </div>
  )
}

export default App