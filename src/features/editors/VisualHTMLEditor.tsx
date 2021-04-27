import './VisualHTMLEditor.css'
import {visualHTMLEditor} from "../../editorconfig"
import Highlight, {defaultProps} from "prism-react-renderer"
import light from 'prism-react-renderer/themes/vsLight'

function VisualHTMLEditor(props: visualHTMLEditor) {
  return (
    <div className={'container'}>
      <Highlight {...defaultProps} code={props.value} language="markdown" theme={light}>
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})} className={'line'}>
              <span className={'line-number'}>{i + 1}</span>
              <span className={'line-content'}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </span>
            </div>
          ))}
        </pre>
        )}
      </Highlight>
    </div>
  )
}

export default VisualHTMLEditor