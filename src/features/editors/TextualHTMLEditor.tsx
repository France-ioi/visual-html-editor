import './TextualHTMLEditor.css'
import React from "react"

interface ITextualHTMLEditor {
  elements: string
}

function TextualHTMLEditor(props: ITextualHTMLEditor) {
  function onChange() {
    console.log('wow')
  }

  // useEffect(() => {
  //   let i = 0
  //   const lineElements: NodeListOf<HTMLElement> = document.querySelectorAll('.ace_line')
  //   lineElements.forEach(line => {
  //     let styles = {height: line.style.height, top: line.style.top}
  //     let newLine: JSX.Element = (
  //       <Droppable droppableId={'ace-line-' + i} key={'ace-line-' + i} direction={"horizontal"}>
  //         {provided => (
  //           <div
  //             className={'ace-line'}
  //             ref={provided.innerRef}
  //             {...provided.droppableProps}
  //             style={styles}
  //           >
  //             {line.innerHTML}
  //           </div>
  //         )}
  //       </Droppable>
  //     )
  //   })
  // })

  return (
    <div className={'textual-html-editor'}>
      {/*<AceEditor*/}
      {/*  mode={"html"}*/}
      {/*  theme={"xcode"}*/}
      {/*  onChange={onChange}*/}
      {/*  name={"textual-html-editor-ace"}*/}
      {/*  height={"100%"}*/}
      {/*  width={"100%"}*/}
      {/*  fontSize={"14px"}*/}
      {/*  defaultValue={props.elements}*/}
      {/*/>*/}
    </div>
  )
}

export default TextualHTMLEditor