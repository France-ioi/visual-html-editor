interface DraggableType {
  dataItem: string,
  children: any
}

function Draggable(props: DraggableType) {
  function startDrag(event: { dataTransfer: { setData: (arg0: string, arg1: string) => void } }) {
    event.dataTransfer.setData("drag-item", props.dataItem)
  }

  return (
    <div draggable onDragStart={startDrag}>
      {props.children}
    </div>
  )
}

export default Draggable