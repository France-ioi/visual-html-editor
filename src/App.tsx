import BlocksToolbox from './features/blocks/BlocksToolbox'
import VisualHTMLEditor from './features/editors/VisualHTMLEditor'
import {useAppDispatch, useAppSelector} from "./hooks"
import {
  DraggableStateSnapshot,
  DraggingStyle,
  DragUpdate,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd"
import {DragDropContext} from "react-beautiful-dnd"
import {createElement, deleteElement, moveElement} from "./store/features/editors/visualHTML"
import TextualHTMLEditor from "./features/editors/TextualHTMLEditor"
import {CodeSegments} from "./editorconfig"

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
  const editorConfig = useAppSelector(state => state.visualHTMLReducer)
  const beautifyHTML = require('js-beautify').html
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

  function parseHTMLToString(elements: CodeSegments | string) {
    let stringedHTML = ''
    if (typeof elements === "string") {
      stringedHTML = elements.replaceAll(/(?<=<|<\/)[?]/g, '')
    } else {
      elements.map(e => {
        let stripped = e.type === 'text' ? `${e.value} ` : e.value.replace('?', '')
        if (e.type === 'opening') {
          stripped = '<' + stripped + '>'
        } else if (e.type === 'closing') {
          stripped = '</' + stripped + '>'
        }
        stringedHTML += stripped
      })
    }
    return beautifyHTML(stringedHTML, {wrap_line_length: 80})
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <BlocksToolbox categories={categories}/>
        {
          editorConfig.type === 'visual' ?
            <VisualHTMLEditor elements={editorConfig.codeElements}/>
            :
            <TextualHTMLEditor elements={parseHTMLToString(editorConfig.codeString)}/>
        }
      </DragDropContext>
    </div>
  )
}

export default App