import './VisualHTMLEditor.css'
import {CodeSegment, CodeSegments} from "../../editorconfig"
import Line from "./VisualHTMLEditorLine"
import {v4 as uuidv4} from 'uuid'

interface IVisualHTMLEditor {
  elements: CodeSegments
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

  function setClasses(element: CodeSegment) { // Prepare classes for wrapTag
    let classes: string = element.unlocked ? 'unlocked' : 'locked'
    if (element.type !== 'text') {
      classes += element.type === 'opening' ? ' opening' : ' closing'
    }
    return classes
  }

  // Function to wrap tag value to render a full tag
  const makeTag = (tag: CodeSegment) => tag.type !== 'text' ?
    tag.type === 'closing' ? `</${tag.value}>` : `<${tag.value}>` :
    tag.value
  // Function to wrap element (tag) in a span
  const wrapTag = (ele: CodeSegment) => (tag: string) =>
    <span className={setClasses(ele)} key={ele.id}>{tag}</span> // TODO Change span to element component with key

  function printLines(elements: CodeSegments) {
    const indenter = (element: CodeSegment) => element.type === 'opening' ? indentCounter++ : indentCounter--
    let prevWasBlock = true, indentCounter = 0, jsxInlineElements: Array<JSX.Element> = [], br: string
    return elements.map((e, index) => {
      let renderElements: JSX.Element = <></>
      if (!identify(e.value)) { // If not block elements, add to inline constructor
        jsxInlineElements.push(wrapTag(e)(makeTag(e)))
        prevWasBlock = false
      } else { // If is block element
        let completeLineContents = jsxInlineElements // Prep line contents for inline elements
        jsxInlineElements = [] // Reset
        br = prevWasBlock ? 'end' : 'both'
        if (br === 'both') {
          if (e.type === 'closing') { // Indent before line creation
            indenter(e)
          }
          renderElements = <>
            <Line key={completeLineContents.map(c => c.key).join()} break={'none'}
                  indent={indentCounter + 1}>{[...completeLineContents]}</Line>
            <Line key={e.id.toString()} break={br} indent={indentCounter}>{wrapTag(e)(makeTag(e))}</Line>
          </>
          if (e.type === 'opening') { // Indent after line creation
            indenter(e)
          }
        } else if (br === 'end') {
          if (e.type === 'closing') { // Indent before line creation
            indenter(e)
          }
          renderElements = <>
            <Line key={e.id.toString()} break={br} indent={indentCounter}>{wrapTag(e)(makeTag(e))}</Line>
          </>
          if (e.type === 'opening') { // Indent after line creation
            indenter(e)
          }
        }
        prevWasBlock = true
      }
      return renderElements
    })
  }

  return (
    <div className={'visual-html-editor'}>
      {printLines(props.elements)}
    </div>
  )
}

export default VisualHTMLEditor