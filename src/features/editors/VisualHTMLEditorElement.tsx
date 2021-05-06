import {Draggable} from "react-beautiful-dnd"

interface IElement {
  className: string
  unlocked: boolean
  children: string
  id: string
  index: number
}

function Element(props: IElement) {

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index} isDragDisabled={!props.unlocked}>
      {provided => (
        <span
          className={props.className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.children}
          {props.index}
        </span>
      )}
    </Draggable>
  )
}

export default Element