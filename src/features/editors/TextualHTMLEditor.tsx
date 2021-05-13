import './TextualHTMLEditor.css'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/ext-beautify"
import React, {FC} from "react"

interface ITextualHTMLEditor {
  elements: string
}

function TextualHTMLEditor(props: ITextualHTMLEditor) {
  let editorRef: AceEditor | null
  const onChange = () => {
    console.log(editorRef?.editor.getValue())
  }

  return (
    <div className={'textual-html-editor'}>
      <AceEditor
        ref={node => {
          editorRef = node
        }}
        mode={"html"}
        theme={"xcode"}
        onChange={onChange}
        name={"textual-html-editor-ace"}
        height={"100%"}
        width={"100%"}
        fontSize={"14px"}
        defaultValue={props.elements}
      />
    </div>
  )
}

export default TextualHTMLEditor