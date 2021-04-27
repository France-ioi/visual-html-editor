import './VisualHTMLEditor.css'
import {visualHTMLEditor} from "../../editorconfig"
import Highlight, {defaultProps} from "prism-react-renderer"
import light from 'prism-react-renderer/themes/vsLight'
import Dropzone from "../draggables/Dropzone";

function VisualHTMLEditor(props: visualHTMLEditor) {
  function droppedTag(e: string) {
    console.log(e)
  }

  return (
    <Highlight {...defaultProps} code={props.value} language="markdown" theme={light}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})} className={'line'}>
              <span className={'line-number'}>{i + 1}</span>
              <Dropzone onTagDropped={droppedTag}>
                <span className={'line-content'}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </span>
              </Dropzone>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default VisualHTMLEditor