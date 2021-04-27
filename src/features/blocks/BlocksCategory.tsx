import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"
import {toggleCategoryAction} from "../../store/features/blocks/blocks"
import {useAppDispatch} from "../../hooks"
import {useRef} from "react";

function BlocksCategory(props: ToolboxCategory) {
  const categoryBlocksRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  function toggleCategory(categoryId: number) {
    dispatch(toggleCategoryAction(categoryId))
  }

  (function () {
    let maxHeight = 0
    let blocksContainer = categoryBlocksRef.current
    if (blocksContainer) {
      if (props.toggled) {
        (blocksContainer.childNodes as NodeListOf<HTMLDivElement>).forEach((block) => {
          maxHeight += block.clientHeight
        })
      } else {
        maxHeight = 0
      }
      blocksContainer.style.maxHeight = maxHeight + "px"
    }
  })()

  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  return (
    <div className={'toolbox-category'} style={categoryStyle}>
      <span className={'toolbox-category-title'} onClick={() => toggleCategory(props.id)}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'} ref={categoryBlocksRef}>
        {props.blocks.map(block => {
          return (
            <Block
              key={block.id}
              tag={block.tag}
              paired={block.paired}
              desc={block.desc}
              toggled={block.toggled}
              maxHeight={block.maxHeight}
              id={block.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BlocksCategory