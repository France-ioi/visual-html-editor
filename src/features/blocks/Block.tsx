import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {useEffect, useRef, DragEvent} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {toggleBlockDescriptionAction} from "../../store/features/blocks/blocks";
import {Draggable} from "react-beautiful-dnd";
import {getDragStyle} from "../../App";

function Block(props: ToolboxCategoryBlocks) {
  const cat = useAppSelector(state => state.blocksReducer.categories.find((c) => c.blocks.find((b) => b.id === props.id)))
  const dispatch = useAppDispatch()
  const blockDescriptionRef = useRef<HTMLDivElement>(null)
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'
  const editorMode = useAppSelector(state => state.visualHTMLReducer.type)

  // TODO Change behavior and fix height inconsistencies
  useEffect(() => {
    (function () {
      let maxHeight = 0
      if (blockDescriptionRef.current && blockDescriptionRef.current.firstElementChild) {
        if (cat && props.id === cat.openDesc) {
          maxHeight = blockDescriptionRef.current.firstElementChild.getBoundingClientRect().height
        } else {
          maxHeight = 0
        }
        blockDescriptionRef.current.style.maxHeight = maxHeight + "px"
      }
    })()
  }, [cat, props.id])

  enum TagTypes {
    Opening = 'opening',
    Closing = 'closing'
  }

  function makeToolboxDraggable(tagProp: string, type: TagTypes, index: number) {
    let classesToAdd = type === 'opening' ? 'toolbox-block-tag tag-open' : 'toolbox-block-tag tag-close'
    let tagToAdd = type === 'opening' ? openingTag : closingTag
    if (editorMode === 'visual') {
      return (
        <Draggable draggableId={tagProp + '-' + type} index={index}>
          {(provided, snapshot) => (
            <>
            <span
              className={classesToAdd}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                //  Cancel return to source animation
                ...getDragStyle(provided.draggableProps.style, snapshot),
                // Prevent element translation
                transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',
              }}
            >
              {tagToAdd}
            </span>
              {snapshot.isDragging && // Retain a copy of element in source position while dragging (copy effect)
              <span style={{transform: 'none !important'}} className={classesToAdd}>
              {tagToAdd}
            </span>}
            </>
          )}
        </Draggable>
      )
    } else {
      function setDragContents(ev: DragEvent) {
        ev.dataTransfer.setData("text", tagToAdd)
      }
      return (
        <span
          className={classesToAdd}
          draggable={true}
          onDragStart={setDragContents}
        >
          {tagToAdd}
        </span>
      )
    }

  }

  return (
    <div className={'toolbox-block'} onClick={() => dispatch(toggleBlockDescriptionAction(props.id))}>
      <span>
        {/* Opening tag */}
        {makeToolboxDraggable(props.tag, TagTypes.Opening, props.id)}
        {/* Closing tag */}
        {props.paired ? makeToolboxDraggable(props.tag, TagTypes.Closing, props.id) : ''}
        <i className={'chevron-right'}/>
        <div className={'toolbox-block-description'} ref={blockDescriptionRef}>
          <span>
            {props.desc}
          </span>
        </div>
      </span>
    </div>
  )
}

export default Block