import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {DragEvent, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {toggleBlockDescriptionAction} from "../../store/features/blocks/blocks";
import {Draggable} from "react-beautiful-dnd";
import {getDragStyle} from "../../App";
import {EditorType, TagType} from "../../editorconfig";
import {polyfill} from "mobile-drag-drop/release";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/release/scroll-behaviour";
import {isTouchDevice} from "../editors/TextualHTMLEditor";

if (isTouchDevice()) {
  // If touch device, enable mobile-drag-drop polyfill
  polyfill({
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
    dragImageCenterOnTouch: true
  })
  window.addEventListener('touchmove', function () {
  }, {passive: false});
}

function Block(props: ToolboxCategoryBlocks) {
  const cat = useAppSelector(state => state.blocksReducer.categories.find(c => c.blocks.find((b) => b.id === props.id)))
  const dispatch = useAppDispatch()
  const blockDescriptionRef = useRef<HTMLDivElement>(null)
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'
  const editorMode = useAppSelector(state => state.visualHTMLReducer.type)
  let prevCrt: Node

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

  function makeToolboxDraggable(tagProp: string, type: TagType, index: number, paired: boolean) {
    let classesToAdd = 'toolbox-block-tag '
    if (!paired) classesToAdd += 'tag-self-closing '
    else classesToAdd += type === TagType.Opening ? 'tag-open ' : 'tag-close '
    let tagToAdd = type === TagType.Opening ? openingTag : closingTag
    if (editorMode === EditorType.Visual) {
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
        let crt = ev.currentTarget.cloneNode(true) as HTMLElement // Get drag target & clone
        prevCrt = crt
        ev.dataTransfer.setData("Text", tagToAdd)
        if (!isTouchDevice()) {
          document.body.appendChild(crt)
          type === TagType.Opening ? // Set element location in relation to cursor depending on opening or closing tag
            ev.dataTransfer.setDragImage(crt, crt.clientWidth + 15, 15)
            :
            ev.dataTransfer.setDragImage(crt, -1, 15)
        }
      }

      function removeOldDrag() {
        if (prevCrt && !isTouchDevice()) document.body.removeChild(prevCrt)
      }

      return (
        <span
          className={classesToAdd}
          draggable={true}
          onDragStart={setDragContents}
          onDragEnd={removeOldDrag}
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
        {makeToolboxDraggable(props.tag, TagType.Opening, props.id, props.paired)}
        {/* Closing tag */}
        {props.paired ? makeToolboxDraggable(props.tag, TagType.Closing, props.id, props.paired) : ''}
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