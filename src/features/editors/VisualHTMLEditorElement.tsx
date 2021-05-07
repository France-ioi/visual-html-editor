import {Draggable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd"

interface IElement {
  className: string
  unlocked: boolean
  children: string
  id: string
  index: number
}

function Element(props: IElement) {
  function getStyle(style: DraggingStyle | NotDraggingStyle | undefined, snapshot: DraggableStateSnapshot) {
    if (!snapshot.isDropAnimating) {
      return style
    }
    if (snapshot.draggingOver === 'toolbox-dropzone') {
      return {
        ...style,
        transitionDuration: `0.001s`,
      }
    }
  }

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index} isDragDisabled={!props.unlocked}>
      {(provided, snapshot) => (
        <span
          className={props.className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {props.children}
        </span>
      )}
    </Draggable>
  )
}

export default Element