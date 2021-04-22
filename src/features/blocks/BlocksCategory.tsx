import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig";

function BlocksCategory(props: ToolboxCategory) {
  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  return (
    <div className={'toolbox-category'} style={categoryStyle}>
      <span className={'toolbox-category-title'}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'}>
        <p>Blocks here</p>
      </div>
    </div>
  )
}

export default BlocksCategory