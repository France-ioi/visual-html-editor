import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppSelector} from "./hooks"

function App() {
  const categories = useAppSelector(state => state.blocksReducer.categories)
  const editorConfig = useAppSelector(state => state.visualHTMLReducer)

  return (
    <div className="App">
      <BlocksToolbox categories={categories}/>
      <VisualHTMLEditor elements={editorConfig.codeElements} indent={editorConfig.indentCount}/>
    </div>
  )
}

export default App