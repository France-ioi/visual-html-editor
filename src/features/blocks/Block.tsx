import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {useEffect, useRef} from "react";
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
  }, [cat])

  // TODO Clean up this return. Too much repeated code
  return (
    <div className={'toolbox-block'} onClick={() => dispatch(toggleBlockDescriptionAction(props.id))}>
      <span>
        <Draggable draggableId={props.id + '-opening'} index={props.id}>
          {(provided, snapshot) => (
            <>
              <span
                className={'toolbox-block-tag tag-open'}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...getDragStyle(provided.draggableProps.style, snapshot),
                  transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',

                }}
              >
                {openingTag}
              </span>
              {snapshot.isDragging &&
              <span style={{transform: 'none !important'}} className={'toolbox-block-tag tag-open'}>
                {openingTag}
              </span>}
            </>
          )}
        </Draggable>
        {
          props.paired ?
            <Draggable draggableId={props.id + '-closing'} index={props.id}>
              {(provided, snapshot) => (
                <>
                  <span
                    className={'toolbox-block-tag tag-close'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...getDragStyle(provided.draggableProps.style, snapshot),
                      transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',
                    }}
                  >
                    {closingTag}
                  </span>
                  {snapshot.isDragging &&
                  <span style={{transform: 'none !important'}} className={'toolbox-block-tag tag-close'}>
                    {closingTag}
                  </span>}
                </>
              )}
            </Draggable>
            :
            ''
        }
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