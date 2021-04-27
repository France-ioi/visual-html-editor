import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"
import {toggleCategoryAction} from "../../store/features/blocks/blocks"
import {useAppDispatch} from "../../hooks"
import {useEffect, useRef} from "react";

function BlocksCategory(props: ToolboxCategory) {
  const categoryBlocksRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  function toggleCategory(categoryId: number) {
    dispatch(toggleCategoryAction(categoryId))
  }

  const categoryStyle = {
    borderLeft: `10px solid ${props.highlight}`
  }

  useEffect(() => {
    (function () {
      let maxHeight = 0
      let blocksContainer = categoryBlocksRef.current
      if (blocksContainer) {
        if (props.toggled) {
          (blocksContainer.childNodes as NodeListOf<HTMLDivElement>).forEach((block) => {
            maxHeight += block.getBoundingClientRect().height
          })
        } else {
          maxHeight = 0
        }
        blocksContainer.style.maxHeight = maxHeight + "px"
      }
    })()
  }, [props.toggled, props.blocks])

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
              id={block.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BlocksCategory