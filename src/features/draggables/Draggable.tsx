import {DragEvent, ReactNode} from "react";

interface DraggableType {
  dataItem: string,
  children: ReactNode
}

function Draggable(props: DraggableType) {
  function startDrag(event: DragEvent & { dataTransfer?: DataTransfer }) {
    event.dataTransfer.setData("drag-item", props.dataItem)
  }

  return (
    <div draggable onDragStart={startDrag}>
      {props.children}
    </div>
  )
}

export default Draggable