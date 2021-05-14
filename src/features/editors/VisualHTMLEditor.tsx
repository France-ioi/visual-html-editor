import './VisualHTMLEditor.css'
import {CodeSegment, CodeSegments} from "../../editorconfig"
import Line from "./VisualHTMLEditorLine"
import LineCounter from "./VisualHTMLEditorLineCounter";

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

  const indenter = (element: CodeSegment) => element.type === 'opening' ? indentCounter++ : indentCounter--

  function identifyBlockType(tag: string) { // Identify block type to determine linebreaks
    const block = [
      'div', 'footer', 'form', 'header', 'hr', 'li', 'main', 'nav',
      'ol', 'ul', 'pre', 'section', 'table', 'video', 'body',
      'head', '!doctype html'
    ]
    const inlineBlock = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'
    ]

    if (block.includes(tag)) return 'block'
    else if (inlineBlock.includes(tag)) return 'inline-block'
    else return 'inline'
  }

  props.elements.forEach((e, index) => {
    const blockType = identifyBlockType(e.value)
    if (blockType === 'inline') { // If is inline element
      lineBuilder.push({...e, index: index}) // Add to current lineBuilder contents
      prevWasBlock = false
    } else if (blockType === 'inline-block') { // If is inline-block element
      if (e.type === 'opening' && lineBuilder.length > 0) {
        lines.push({lineContents: lineBuilder, lineIndentation: indentCounter})
        lineBuilder = [] // Reset lineBuilder for next element(s)
      }
      lineBuilder.push({...e, index: index})
      if (e.type === 'closing') {
        prevWasBlock = false
        // lines.push({lineContents: lineBuilder, lineIndentation: indentCounter})
        // lineBuilder = [] // Reset lineBuilder for next element(s)
      }
    } else { // If is block element
      if (!prevWasBlock) { // If previous element was inline
        // Push constructed lineBuilder to lines (new line)
        lines.push({lineContents: lineBuilder, lineIndentation: indentCounter})
        lineBuilder = [] // Reset lineBuilder for next element(s)
      }
      if (e.type === 'closing') indenter(e)
      lineBuilder.push({...e, index: index}) // Add block element to lineBuilder
      // Push constructed lineBuilder to lines (new line)
      lines.push({lineContents: lineBuilder, lineIndentation: indentCounter})
      lineBuilder = [] // Reset lineBuilder for next element(s)
      if (e.type === 'opening') indenter(e)
      prevWasBlock = true
    }
  })

  return (
    <div className={'visual-html-editor'}>
      <div className={'lines-counter'}>
        <LineCounter lineCount={lines.length}/>
      </div>
      <div className={'lines-container'}>
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
    </div>
  )
}

export default VisualHTMLEditor