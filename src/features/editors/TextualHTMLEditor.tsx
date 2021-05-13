import './TextualHTMLEditor.css'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/ext-beautify"
import React from "react"
import {useAppDispatch} from "../../hooks";
import {updateTextual} from "../../store/features/editors/HTMLEditors";

interface ITextualHTMLEditor {
  elements: string
}

function debounce(callback: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), wait)
  }
}

function TextualHTMLEditor(props: ITextualHTMLEditor) {
  let editorRef: AceEditor | null
  const dispatch = useAppDispatch()
  const onChange = () => {
    dispatch(updateTextual(editorRef!.editor.getValue()))
  }

  return (
    <div className={'textual-html-editor'}>
      <AceEditor
        ref={node => {
          editorRef = node
        }}
        mode={"html"}
        theme={"xcode"}
        onChange={debounce(onChange, 300)}
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