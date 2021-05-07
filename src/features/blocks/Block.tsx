import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {toggleBlockDescriptionAction} from "../../store/features/blocks/blocks";

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

  return (
    <div className={'toolbox-block'} onClick={() => dispatch(toggleBlockDescriptionAction(props.id))}>
      <span>
        <span className={'toolbox-block-tag tag-open'}>
          {openingTag}
        </span>
        {
          props.paired ?
            <span className={'toolbox-block-tag tag-close'}>
              {closingTag}
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