import './VisualHTMLEditor.css'
import {CodeSegment, CodeSegments, InitialEditorState} from "../../editorconfig"

function VisualHTMLEditor(props: InitialEditorState) {
  function indentify(tag: string) { // Identify block type to determine linebreaks
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

  function renderEditorCode(locked: CodeSegments, unlocked: CodeSegments) {
    let editorCode = locked.map((seg: CodeSegment) => seg)
    unlocked.forEach((seg: CodeSegment) => {
      editorCode.splice(seg.pos!, 0, seg)
    })
    let codeToDisplay: Array<JsxElementWithLinebreaks> = []
    let prevWasBlock = true
    editorCode.forEach((seg: CodeSegment) => {
      if (indentify(seg.value)) { // If is block element
        if (prevWasBlock) { // If is block and previous was block (new line br at end)
          codeToDisplay.push(
            {
              jsx: <span>{seg.fullValue}</span>,
              br: 'end'
            }
          )
        } else { // Is block but previous is inline (new line br both sides)
          codeToDisplay.push({
            jsx: <span>{seg.fullValue}</span>,
            br: 'both'
          })
        }
        prevWasBlock = true
      } else { // If is not block element
        codeToDisplay.push({
          jsx: <span>{seg.fullValue}</span>,
          br: 'none'
        })
        prevWasBlock = false
      }
    })
    return codeToDisplay
  }

  const display = renderEditorCode(props.lockedCode, props.userCode)

  let jsxInlineElements: Array<JSX.Element> = []

  return (
    <div style={{paddingLeft: "15px"}}>
      {display.map((e: JsxElementWithLinebreaks) => {
        if (e.br === 'end') {
          return <><span className={'line'}>{e.jsx}</span><br/></>
        } else if (e.br === 'both') {
          let completeLineContents = jsxInlineElements
          jsxInlineElements = []
          return <><span className={'line'}>{completeLineContents.map(e => e)}</span><br/><span
            className={'line'}>{e.jsx}</span><br/></>
        } else if (e.br === 'none') {
          jsxInlineElements.push(e.jsx)
        }
      })}
    </div>
  )
}

export default VisualHTMLEditor