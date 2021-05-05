import './VisualHTMLEditorLine.css'
import {Droppable} from "react-beautiful-dnd"
import Element from "./VisualHTMLEditorElement";
import {LineSegments, LineSegment} from "./VisualHTMLEditor";

interface ILine {
  indent: number,
  id: string,
  children: LineSegments
}

function Line(props: ILine) {
  const makeTag = (tag: LineSegment) => tag.type !== 'text' ?
    tag.type === 'closing' ? `</${tag.value}>` : `<${tag.value}>` :
    tag.value

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
    <>
      <Droppable key={props.id} droppableId={props.id} direction={"horizontal"}>
        {provided => (
          <span
            className={'line'}
            style={{paddingLeft: 25 * props.indent}}
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
            {provided.placeholder}
          </span>
        )}
      </Droppable>
      <br/>
    </>
  )
}

export default Line