import './VisualHTMLEditor.css'
import {CodeSegment, CodeSegments} from "../../editorconfig"
import Line from "./VisualHTMLEditorLine"
import {v4 as uuidv4} from 'uuid'

interface IVisualHTMLEditor {
  elements: CodeSegments,
  indent: number
}

function VisualHTMLEditor(props: IVisualHTMLEditor) {
  function identify(tag: string) { // Identify block type to determine linebreaks
    // TODO Object to define types (4 types not 2)
    const blockLevel = [
      'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'hr', 'li', 'main', 'nav', 'ol', 'ul', 'p', 'pre',
      'section', 'table', 'video', 'body', 'head', '!doctype html'
    ]
    return blockLevel.includes(tag)
  }

  const makeTag = (tag: CodeSegment) => tag.type !== 'text' ?
    tag.type === 'closing' ? `</${tag.value}>` : `<${tag.value}>` :
    tag.value
  const wrapTag = (unlocked: boolean) => (tag: string) =>
    <span className={unlocked ? 'unlocked' : 'locked'}>{tag}</span> // TODO Change span to element component with key

  function printLines(elements: CodeSegments) {
    const indenter = (element: CodeSegment) => element.type === 'opening' ? indentCounter++ : indentCounter--
    let prevWasBlock = true, indentCounter = 0, jsxInlineElements: Array<JSX.Element> = [], br: string
    return elements.map((e, index) => {
      let renderElements: JSX.Element = <></>
      if (!identify(e.value)) { // If not block elements, add to inline constructor
        jsxInlineElements.push(wrapTag(e.unlocked)(makeTag(e)))
        prevWasBlock = false
      } else { // If is block element
        let completeLineContents = jsxInlineElements
        jsxInlineElements = []
        br = prevWasBlock ? 'end' : 'both'
        if (br === 'both') {
          if (e.type === 'closing') {
            indenter(e)
          }
          renderElements = <>
            <Line key={uuidv4()} break={'none'} indent={indentCounter + 1}>{[...completeLineContents]}</Line>
            <Line key={uuidv4()} break={br} indent={indentCounter}>{wrapTag(e.unlocked)(makeTag(e))}</Line>
          </>
          if (e.type === 'opening') {
            indenter(e)
          }
        } else if (br === 'end') {
          if (e.type === 'closing') {
            indenter(e)
          }
          renderElements = <>
            <Line key={uuidv4()} break={br} indent={indentCounter}>{wrapTag(e.unlocked)(makeTag(e))}</Line>
          </>
          if (e.type === 'opening') {
            indenter(e)
          }
        }
        prevWasBlock = true
      }
      return renderElements
    })
  }


  return (
    <div style={{paddingLeft: "15px"}}>
      {printLines(props.elements)}
    </div>
  )
}

export default VisualHTMLEditor