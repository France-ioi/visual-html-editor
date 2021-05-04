import './VisualHTMLEditor.css'
import {CodeSegment, CodeSegments, InitialEditorState} from "../../editorconfig"
import Line from "./VisualHTMLEditorLine"

function VisualHTMLEditor(props: InitialEditorState) {
  function indentify(tag: string) { // Identify block type to determine linebreaks
    // TODO Object to define types (4 types not 2)
    const blockLevel = [
      'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'hr', 'li', 'main', 'nav', 'ol', 'ul', 'p', 'pre',
      'section', 'table', 'video', 'body', 'head', '!doctype html'
    ]
    return blockLevel.includes(tag)
  }

  interface JsxElementWithLinebreaks {
    jsx: JSX.Element,
    br: string
  }

  type EditorCode = Array<CodeSegment>

  // TODO Single source for render for perf - also iframe
  function renderEditorCode(locked: CodeSegments, unlocked: CodeSegments) {
    let editorCode: EditorCode = [...locked] // Copy locked to editorCode
    unlocked.forEach((seg: CodeSegment) => {
      editorCode.splice(seg.pos!, 0, seg) // Insert unlocked tags to editorCode at position
    })
    let codeToDisplay: Array<JsxElementWithLinebreaks> = []
    let prevWasBlock = true // Was previous element a block-level element
    editorCode.forEach((seg: CodeSegment) => {
      if (indentify(seg.value)) { // If is block element
        if (prevWasBlock) { // If is block and previous was block (new line br at end)
          codeToDisplay.push(
            {
              jsx: <span className={seg.locked ? 'locked' : 'unlocked'}>{seg.fullValue}</span>,
              br: 'end'
            }
          )
        } else { // Is block but previous is inline (new line br both sides)
          codeToDisplay.push({
            jsx: <span className={seg.locked ? 'locked' : 'unlocked'}>{seg.fullValue}</span>,
            br: 'both'
          })
        }
        prevWasBlock = true
      } else { // If is not block element
        codeToDisplay.push({
          jsx: <span className={seg.locked ? 'locked' : 'unlocked'}>{seg.fullValue}</span>,
          br: 'none'
        })
        prevWasBlock = false
      }
    })
    console.log(codeToDisplay)
    return codeToDisplay
  }

  const display = renderEditorCode(props.lockedCode, props.userCode)

  let jsxInlineElements: Array<JSX.Element> = []

  return (
    <div style={{paddingLeft: "15px"}}>
      {display.map((e: JsxElementWithLinebreaks) => {
        if (e.br === 'end') {
          return <><Line break={e.br}>{e.jsx}</Line></>
        } else if (e.br === 'both') {
          let completeLineContents = jsxInlineElements
          jsxInlineElements = []
          return <><Line break={'none'}>{completeLineContents.map(e => e)}</Line><Line break={e.br}>{e.jsx}</Line></>
        } else if (e.br === 'none') {
          jsxInlineElements.push(e.jsx)
        }
      })}
    </div>
  )
}

export default VisualHTMLEditor