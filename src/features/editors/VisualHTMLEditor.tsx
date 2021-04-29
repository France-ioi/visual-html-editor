import './VisualHTMLEditor.css'
import {InitialEditorState} from "../../editorconfig"

function VisualHTMLEditor(props: InitialEditorState) {
  function indentify(tag: string) { // Identify block type to determine linebreaks
    const blockLevel = [
      'div', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'hr', 'li', 'main', 'nav', 'ol', 'ul', 'p', 'pre',
      'section', 'table', 'video', 'body', 'head', '!doctype html'
    ]
    return blockLevel.includes(tag)
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
          codeToDisplay.push(<><span>{seg.fullValue}</span><br/></>)
        } else {
          codeToDisplay.push(<><br/><span>{seg.fullValue}</span><br/></>)
        }
        prevWasBlock = true
      } else { // If is not block element
        codeToDisplay.push(<span>{seg.fullValue}</span>)
        prevWasBlock = false
      }
    })
    console.log(codeToDisplay)
    return codeToDisplay
  }

  const display = renderEditorCode(props.lockedCode, props.userCode)

  return (
    <div style={{paddingLeft: "15px"}}>
      {display.map((e: any) => {
        if (e.props.children.length >= 2) {
          return <span className="line"> {e} </span>
        } else {
          return e
        }
      })}
    </div>
  )
}

export default VisualHTMLEditor