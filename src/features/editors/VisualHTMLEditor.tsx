import './VisualHTMLEditor.css'
import {InitialEditorState} from "../../editorconfig"

function VisualHTMLEditor(props: InitialEditorState) {
  function indentify(tag: string) { // Identify block type to determine linebreaks
    const blockLevel = [
      'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'hr', 'li', 'main', 'nav', 'ol', 'ul', 'p', 'pre',
      'section', 'table', 'video', 'body', 'head', '!doctype html'
    ]
    if (blockLevel.includes(tag)) {
      return true
    } else {
      return false
    }
  }

  function renderEditorCode(code1: any, code2: any) {
    let editorCode = code1.map((obj: any) => obj)
    code2.forEach((seg: any) => {
      editorCode.splice(seg.pos, 0, seg)
    })
    let codeToDisplay: Array<JSX.Element> = []
    let prevWasBlock = true
    editorCode.forEach((seg: any) => {
      if (indentify(seg.value)) { // If is block element
        if (prevWasBlock) {
          codeToDisplay.push(<span>{seg.fullValue}<br/></span>)
        } else {
          codeToDisplay.push(<span><br/>{seg.fullValue}<br/></span>)
        }
        prevWasBlock = true
      } else { // If is not block element
        codeToDisplay.push(<span>{seg.fullValue}</span>)
        prevWasBlock = false
      }
    })
    return codeToDisplay
  }

  const display = renderEditorCode(props.lockedCode, props.userCode)

  return (
    <div style={{paddingLeft: "15px"}}>
      {display.map((e: any) => {
        return e
      })}
    </div>
  )
}

export default VisualHTMLEditor