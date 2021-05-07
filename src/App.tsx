import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppDispatch, useAppSelector} from "./hooks"
import {DragUpdate, DropResult} from "react-beautiful-dnd"
import {DragDropContext} from "react-beautiful-dnd"
import {deleteElement, moveElement} from "./store/features/editors/visualHTML"

function App() {
  const categories = useAppSelector(state => state.blocksReducer.categories)
  const editorConfig = useAppSelector(state => state.visualHTMLReducer.codeElements)
  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    if (result.source && result.destination) {
      if (result.destination.droppableId === 'toolbox-dropzone') {
        dispatch(deleteElement(result))
      }else if (result.source.index !== result.destination.index) {
        dispatch(moveElement(result))
      }
    }
  }

  //TODO Insert animated cursor to show user precisely where their tag will be dropped
  const onDragUpdate = (update: DragUpdate) => {
    console.log('Dragging over: ' + update.destination?.index)
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <BlocksToolbox categories={categories}/>
        <VisualHTMLEditor elements={editorConfig}/>
      </DragDropContext>
    </div>
  )
}

export default App