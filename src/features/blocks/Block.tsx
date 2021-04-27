import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {useEffect, useRef} from "react";
import {useAppDispatch} from "../../hooks";
import {toggleBlockDescriptionAction} from "../../store/features/blocks/blocks";
import Draggable from "../draggables/Draggable";

function Block(props: ToolboxCategoryBlocks) {
  const dispatch = useAppDispatch()
  const blockDescriptionRef = useRef<HTMLDivElement>(null)
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'

  function toggleBlockDescription(block: number) {
    dispatch(toggleBlockDescriptionAction(block))
  }

  useEffect(() => {
    (function () {
      let maxHeight = 0
      if (blockDescriptionRef.current && blockDescriptionRef.current.firstElementChild) {
        if (props.toggled) {
          maxHeight = blockDescriptionRef.current.firstElementChild.getBoundingClientRect().height
        } else {
          maxHeight = 0
        }
        blockDescriptionRef.current.style.maxHeight = maxHeight + "px"
      }
    })()
  }, [props.toggled])

  return (
    <div className={'toolbox-block'} onClick={() => toggleBlockDescription(props.id)}>
      <span>
        <span className={'toolbox-block-tag tag-open'}>
          <Draggable key={props.tag + '-open'} dataItem={props.tag + '-open'}>
            {openingTag}
          </Draggable>
        </span>
        {
          props.paired ?
            <span className={'toolbox-block-tag tag-close'}>
              <Draggable key={props.tag + '-close'} dataItem={props.tag + '-close'}>
                {closingTag}
              </Draggable>
            </span>
            :
            ''
        }
        <i className={'chevron-right'}/>
        <div className={'toolbox-block-description'} ref={blockDescriptionRef}>
          <span>
            {props.desc ? props.desc : ''}
          </span>
        </div>
      </span>
    </div>
  )
}

export default Block