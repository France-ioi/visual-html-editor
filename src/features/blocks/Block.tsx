import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {toggleBlockDescriptionAction} from "../../store/features/blocks/blocks";
import {Draggable} from "react-beautiful-dnd";
import {getDragStyle} from "../../App";
import {TagType} from "../../editorconfig";

function Block(props: ToolboxCategoryBlocks) {
  const cat = useAppSelector(state => state.blocksReducer.categories.find(c => c.blocks.find((b) => b.id === props.id)))
  const dispatch = useAppDispatch()
  const blockDescriptionRef = useRef<HTMLDivElement>(null)
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'

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

  function makeToolboxDraggable(tagProp: string, type: TagType, index: number) {
    let classesToAdd = type === TagType.Opening ? 'toolbox-block-tag tag-open' : 'toolbox-block-tag tag-close'
    let tagToAdd = type === TagType.Opening ? openingTag : closingTag
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
  }

  return (
    <div className={'toolbox-block'} onClick={() => dispatch(toggleBlockDescriptionAction(props.id))}>
      <span>
        {/* Opening tag */}
        {makeToolboxDraggable(props.tag, TagType.Opening, props.id)}
        {/* Closing tag */}
        {props.paired ? makeToolboxDraggable(props.tag, TagType.Closing, props.id) : ''}
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