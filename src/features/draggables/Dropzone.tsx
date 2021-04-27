import {DragEvent, ReactNode} from "react";

interface DropzoneType {
  onTagDropped: Function,
  children: ReactNode
}

function Dropzone(props: DropzoneType) {
  function dragOver(event: DragEvent) {
    event.preventDefault()
  }

  function drop(event: DragEvent) {
    const droppedTag = event.dataTransfer.getData("drag-item")
    if (droppedTag) props.onTagDropped(droppedTag)
  }

  return (
    <div onDragOver={dragOver} onDrop={drop}>
      {props.children}
    </div>
  )
}

export default Dropzone