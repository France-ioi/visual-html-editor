import './Block.css'
import {ToolboxCategoryBlocks} from "../../toolboxconfig";

function Block(props: ToolboxCategoryBlocks) {
  return (
    <div className={'toolbox-block'}>
      <span style={{pointerEvents: "none"}}>
        <span className={'toolbox-block-tag tag-open'}>Opening Tag</span>
        {
          props.paired ?
            <span className={'toolbox-block-tag tag-close'}>Closing Tag</span>
            :
            ''
        }
        {props.desc}
      </span>
    </div>
  )
}

export default Block