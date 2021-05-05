import './VisualHTMLEditor.css'
import {CodeSegment, CodeSegments} from "../../editorconfig"
import Line from "./VisualHTMLEditorLine"
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {useAppDispatch} from "../../hooks"
import {moveElement} from "../../store/features/editors/visualHTML";

interface IVisualHTMLEditor {
  elements: CodeSegments
}

export type LineSegment = {
  id: string,
  type: string,
  value: string,
  unlocked: boolean,
  index: number
}

export type LineSegments = Array<LineSegment>

type TLine = {
  lineContents: LineSegments,
  lineIndentation: number
}

function VisualHTMLEditor(props: IVisualHTMLEditor) {
  let indentCounter = 0
  let lineBuilder: LineSegments = []
  let lines: Array<TLine> = []
  let prevWasBlock: boolean = true

  const dispatch = useAppDispatch()

  const indenter = (element: CodeSegment) => element.type === 'opening' ? indentCounter++ : indentCounter--

  const onDragEnd = (result: DropResult) => {
    if (result.source && result.destination) {
      if (result.source.index !== result.destination.index) {
        dispatch(moveElement(result))
      }
    }
  }

  function identify(tag: string) { // Identify block type to determine linebreaks
    // TODO Object to define types (4 types not 2)
    const blockLevel = [
      'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'hr', 'li', 'main', 'nav', 'ol', 'ul', 'p', 'pre',
      'section', 'table', 'video', 'body', 'head', '!doctype html'
    ]
    return blockLevel.includes(tag)
  }

  props.elements.forEach((e, index) => {
    if (!identify(e.value)) { // If is inline element
      lineBuilder.push({...e, index: index}) // Add to current lineBuilder contents
      prevWasBlock = false
    } else { // If is block element
      if (e.type === 'closing') indenter(e)
      if (!prevWasBlock) { // If previous element was inline
        lines.push({lineContents: lineBuilder, lineIndentation: indentCounter + 1}) // Push constructed lineBuilder to lines (new line)
        lineBuilder = [] // Reset lineBuilder for next element(s)
      }
      lineBuilder.push({...e, index: index}) // Add block element to lineBuilder
      lines.push({lineContents: lineBuilder, lineIndentation: indentCounter}) // Push constructed lineBuilder to lines (new line)
      lineBuilder = [] // Reset lineBuilder for next element(s)
      if (e.type === 'opening') indenter(e)
      prevWasBlock = true
    }
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={'visual-html-editor'}>
        {
          lines.map(line => {
            let keyGen = line.lineContents.map(e => e.id).join()
            return <Line
              id={'line-' + keyGen}
              key={keyGen}
              children={line.lineContents}
              indent={line.lineIndentation}
            />
          })
        }
      </div>
    </DragDropContext>
  )
}

export default VisualHTMLEditor