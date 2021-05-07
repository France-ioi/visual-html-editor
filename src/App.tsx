import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppDispatch, useAppSelector} from "./hooks"
import {DraggableStateSnapshot, DraggingStyle, DragUpdate, DropResult, NotDraggingStyle} from "react-beautiful-dnd"
import {DragDropContext} from "react-beautiful-dnd"
import {deleteElement, moveElement} from "./store/features/editors/visualHTML"

// Used to cancel transition animation for certain draggables
export function getDragStyle(style: DraggingStyle | NotDraggingStyle | undefined, snapshot: DraggableStateSnapshot) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  if (snapshot.draggingOver === 'toolbox-dropzone') {
    return {
      ...style,
      transitionDuration: `0.001s`,
    }
  }
  return style
}

function App() {
  const categories = useAppSelector(state => state.blocksReducer.categories)
  const editorConfig = useAppSelector(state => state.visualHTMLReducer.codeElements)
  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    if (result.source && result.destination) {
      if (result.destination.droppableId === 'toolbox-dropzone') {
        dispatch(deleteElement(result))
      } else if (result.source.index !== result.destination.index) {
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