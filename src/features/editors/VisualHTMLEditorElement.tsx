import {Draggable} from "react-beautiful-dnd"
import {getDragStyle} from "../../App"

interface ElementProps {
  className: string
  unlocked: boolean
  children: string
  id: string
  index: number
}

function Element(props: ElementProps) {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index} isDragDisabled={!props.unlocked}>
      {(provided, snapshot) => (
        <span
          className={props.className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDragStyle(provided.draggableProps.style, snapshot)}
        >
          {props.children}
        </span>
      )}
    </Draggable>
  )
}

export default Element