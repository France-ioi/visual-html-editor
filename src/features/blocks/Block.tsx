import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";
import {ReactNode} from "react";

function Block(props: ToolboxCategoryBlocks) {
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'

  let description: ReactNode
  if (props.desc) {
    description = <div className={'toolbox-block-description'}>{props.desc}</div>
  }

  return (
    <div className={'toolbox-block'}>
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