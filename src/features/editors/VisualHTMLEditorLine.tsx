import './VisualHTMLEditorLine.css'
import {Droppable} from "react-beautiful-dnd"

interface ILine {
  break: string,
  indent: number,
  id: string,
  children: Array<JSX.Element> | JSX.Element
}

function Line(props: ILine) {
  let breakStart, breakEnd
  switch (props.break) {
    case 'end':
      breakStart = false
      breakEnd = true
      break
    case 'both':
      breakStart = true
      breakEnd = true
      break
    case 'none':
      breakStart = false
      breakEnd = false
      break
    default:
      break
  }

  return (
    <>
      {breakStart ? <br/> : ''}
      <Droppable droppableId={props.id} direction={"horizontal"}>
        {provided => (
          <span
            className={'line'}
            style={{paddingLeft: 25 * props.indent}}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.children}
            {provided.placeholder}
          </span>
        )}
      </Droppable>
      {breakEnd ? <br/> : ''}
    </>
  )
}

export default Line