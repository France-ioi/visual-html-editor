import './VisualHTMLEditor.css'
import {InitialEditorState} from "../../editorconfig"
import Dropzone from "../draggables/Dropzone";

function VisualHTMLEditor(props: InitialEditorState) {
  function droppedTag(e: string) {
    console.log(e)
  }

  function indentify(tag: string) {
    const blockLevel = [
      'div',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'header',
      'hr',
      'li',
      'main',
      'nav',
      'ol',
      'ul',
      'p',
      'pre',
      'section',
      'table',
      'video',
      'body'
    ]

    if (blockLevel.includes(tag)) {
      return true
    } else {
      return false
    }
  }

  function renderEditorCode(code: any) {
    let codeToDisplay: Array<JSX.Element> = []
    let prevWasBlock = true
    code.forEach((seg: any) => {
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

  const display = renderEditorCode(props.lockedCode)

  return (
    <div style={{paddingLeft: "15px"}}>
      {display.map(e => {
        return e
      })}
    </div>
  )
}

export default VisualHTMLEditor