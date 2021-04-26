import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {MutableRefObject, ReactNode, useRef} from "react";
import {useAppDispatch} from "../../hooks";
import {toggleBlockDescriptionAction} from "../../store/features/blocks/blocks";

function Block(props: ToolboxCategoryBlocks) {
  const dispatch = useAppDispatch()
  const blockDescriptionRef = useRef<HTMLSpanElement>(null)
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'

  let description: ReactNode
  if (props.desc) {
    description =
      <div
        className={'toolbox-block-description'}
        style={props.toggled ? {maxHeight: "20px"} : {maxHeight: "0"}}
      >
        <span ref={blockDescriptionRef}>{props.desc}</span>
      </div>
  }

  function toggleBlockDescription(block: number, blockRef: MutableRefObject<any>) {
    dispatch(toggleBlockDescriptionAction(block, blockRef))
  }

  return (
    <div className={'toolbox-block'} onClick={() => toggleBlockDescription(props.id, blockDescriptionRef)}>
      <span style={{pointerEvents: "none"}}>
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
        {description}
      </span>
    </div>
  )
}

export default Block