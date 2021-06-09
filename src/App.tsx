import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppDispatch, useAppSelector} from "./hooks"
import {
  DragDropContext,
  DraggableStateSnapshot,
  DraggingStyle,
  DragUpdate,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd"
import {createElement, deleteElement, moveElement} from "./store/features/editors/HTMLEditors"
import TextualHTMLEditor from "./features/editors/TextualHTMLEditor"
import {EditorType} from "./editorconfig"
import {allowModeSwitch} from "./appconfig";
import HTMLParser from "./features/parsers/HTMLParser";

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
  const categories = useAppSelector(state => state.blocksReducer)
  const editorConfig = useAppSelector(state => state.visualHTMLReducer)
  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    if (result.source && result.destination) {
      if (result.destination.droppableId === 'toolbox-dropzone' && result.source.droppableId !== 'toolbox-dropzone') {
        dispatch(deleteElement(result))
      } else if (result.source.droppableId !== 'toolbox-dropzone' && result.source.index !== result.destination.index) {
        dispatch(moveElement(result))
      } else if (result.source.droppableId === 'toolbox-dropzone' && result.destination.droppableId !== 'toolbox-dropzone') {
        dispatch(createElement(result))
      }
    }
  }

  //TODO Insert animated cursor to show user precisely where their tag will be dropped
  const onDragUpdate = (update: DragUpdate) => {
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <BlocksToolbox categories={categories} allowModeSwitch={allowModeSwitch}/>
        {
          editorConfig.type === EditorType.Visual ? // Load either visual or textual HTML editor with relevant code
            <VisualHTMLEditor elements={editorConfig.codeElements}/>
            :
            <TextualHTMLEditor elements={editorConfig.codeString}/>
        }
      </DragDropContext>
      <HTMLParser/>
    </div>
  )
}

export default App