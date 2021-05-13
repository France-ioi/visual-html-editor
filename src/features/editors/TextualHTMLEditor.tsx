import './TextualHTMLEditor.css'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/ext-beautify"
import {Droppable} from "react-beautiful-dnd"
import React, {useEffect} from "react"

interface ITextualHTMLEditor {
  elements: string
}

function TextualHTMLEditor(props: ITextualHTMLEditor) {
  function onChange() {
    console.log('wow')
  }

  useEffect(() => {
    let i = 0
    const lineElements = document.querySelectorAll('.ace_line')
    lineElements.forEach(line => {
      let newLine = (
        <Droppable droppableId={'ace-line-' + i} key={'ace-line-' + i} direction={"horizontal"}>
          {provided => (
            <div
              className={'ace-line-droppable'}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {{...line}}
            </div>
          )}
        </Droppable>
      )
      // line.replaceWith(newLine) // TODO Figure out how to force element replacement
    })
  })

  return (
    <div className={'textual-html-editor'}>
      <AceEditor
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