import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"
import {toggleCategoryAction} from "../../store/features/blocks/blocksCategory"
import {useAppDispatch} from "../../hooks"
import {useRef} from "react";

function BlocksCategory(props: ToolboxCategory) {
  const categoryBlocksRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  function toggleCategory(categoryId: Number) {
    dispatch(toggleCategoryAction(categoryId))
  }

  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  // Handle max-height property of .toolbox-category-blocks for accordion effect
  if (props.toggled && categoryBlocksRef.current) {
    let categoryBlocksInnerHeight = 0;
    (categoryBlocksRef.current.childNodes as NodeListOf<HTMLDivElement>).forEach((block: HTMLDivElement) => {
      categoryBlocksInnerHeight += block.clientHeight
    })
    categoryBlocksRef.current.style.maxHeight = `${categoryBlocksInnerHeight}px`
  } else if (categoryBlocksRef.current) {
    categoryBlocksRef.current.style.maxHeight = '0'
  }

  return (
    <div className={'toolbox-category'} style={categoryStyle}>
      <span className={'toolbox-category-title'} onClick={() => toggleCategory(props.id)}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'} ref={categoryBlocksRef}>
        {props.blocks.map(block => {
          return <Block key={block.id} tag={block.tag} paired={block.paired} desc={block.desc} id={undefined}/>
        })}
      </div>
    </div>
  )
}

export default BlocksCategory