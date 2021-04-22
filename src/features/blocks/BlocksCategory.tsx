import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"

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
        {props.blocks.map(block => {
          return <Block key={block.tag} tag={block.tag} paired={block.paired} desc={block.desc}/>
        })}
      </div>
    </div>
  )
}

export default BlocksCategory