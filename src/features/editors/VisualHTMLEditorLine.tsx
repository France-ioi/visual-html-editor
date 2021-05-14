import './VisualHTMLEditorLine.css'
import {Droppable} from "react-beautiful-dnd"
import Element from "./VisualHTMLEditorElement";
import {LineSegments, LineSegment} from "./VisualHTMLEditor";
import {makeTag} from "../../editorconfig";

interface ILine {
  indent: number,
  id: string,
  children: LineSegments
}

function Line(props: ILine) {
  function setClasses(element: LineSegment) {
    let classes: string = element.unlocked ? 'unlocked' : 'locked'
    if (element.type !== 'text') {
      classes += element.type === 'opening' ? ' opening' : ' closing'
    } else {
      classes += ' text'
    }
    return classes
  }

  return (
    <Droppable key={props.id} droppableId={props.id} direction={"horizontal"}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDraggingOver ? 'line is-dragged-over' : 'line'
          }
          style={{paddingLeft: 35 * props.indent + 4}}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {
            props.children.map(c => {
              return <Element
                id={c.id}
                key={c.id}
                index={c.index}
                className={setClasses(c)}
                children={makeTag(c)}
                unlocked={c.unlocked}
              />
            })
          }
        </div>
      )}
    </Droppable>
  )
}

export default Line