import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";

function Block(props: ToolboxCategoryBlocks) {
  const openingTag = '<' + props.tag + '>'
  const closingTag = '</' + props.tag + '>'

  let description
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
        {description}
      </span>
    </div>
  )
}

export default Block