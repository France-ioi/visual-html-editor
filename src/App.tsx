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
import PreviewWebpage from "./features/preview/PreviewWebpage"
import {TagType} from "./editorconfig"
import {EditorType} from "./editorconfig"
import {allowModeSwitch} from "./appconfig";

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
  let codeToInsert = ""

  function refreshPreview() {
    // If editor type is visual, build code string from codeElements
    // otherwise use codeString directly
    editorConfig.type === EditorType.Visual ?
      editorConfig.codeElements.map(e => {
        let tag = ''
        if (e.type === TagType.Opening) tag = '<' + e.value + '>'
        else if (e.type === TagType.Closing) tag = '</' + e.value + '>'
        else tag = `${e.value} `
        return codeToInsert += tag
      })
      :
      codeToInsert = editorConfig.codeString
    return codeToInsert
  }

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

  refreshPreview()

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
        <PreviewWebpage code={codeToInsert}/>
      </DragDropContext>
    </div>
  )
}

export default App