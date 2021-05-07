import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppSelector} from "./hooks"

function App() {
  const categories = useAppSelector(state => state.blocksReducer.categories)
  const editorConfig = useAppSelector(state => state.visualHTMLReducer.codeElements)

  return (
    <div className="App">
      <BlocksToolbox categories={categories}/>
      <VisualHTMLEditor elements={editorConfig}/>
    </div>
  )
}

export default App