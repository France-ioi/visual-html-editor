import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"
import {toggleCategoryAction} from "../../store/features/blocks/blocksCategory"
import {useAppSelector, useAppDispatch} from "../../hooks"

function BlocksCategory(props: ToolboxCategory) {
  const dispatch = useAppDispatch()

  function toggleCategory(categoryId: Number) {
    dispatch(toggleCategoryAction(categoryId))
  }

  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  return (
    <div className={'toolbox-category'} style={categoryStyle}>
      <span className={'toolbox-category-title'} onClick={() => toggleCategory(props.id)}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'}>
        {props.blocks.map(block => {
          return <Block key={block.id} tag={block.tag} paired={block.paired} desc={block.desc} id={undefined}/>
        })}
      </div>
    </div>
  )
}

export default BlocksCategory