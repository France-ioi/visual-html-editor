import './BlocksCategory.css'
import {ToolboxCategory} from "../../toolboxconfig"
import Block from "./Block"
import {useEffect, useRef, useState} from "react"

function BlocksCategory(props: ToolboxCategory) {
  const [open, setOpen] = useState(false)
  const categoryBlocksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (function () {
      let maxHeight = 0
      let blocksContainer = categoryBlocksRef.current
      if (blocksContainer) {
        if (open) {
          (blocksContainer.childNodes as NodeListOf<HTMLDivElement>).forEach((block) => {
            maxHeight += block.getBoundingClientRect().height
          })
        } else {
          maxHeight = 0
        }
        blocksContainer.style.maxHeight = maxHeight + "px"
      }
    })()
  }, [open, props.openDesc])

  return (
    <div className={'toolbox-category'} style={{borderLeft: `10px solid ${props.highlight}`}}>
      <span className={'toolbox-category-title'} onClick={() => setOpen(!open)}>
        {props.name}
      </span>
      <div className={'toolbox-category-blocks'} ref={categoryBlocksRef}>
        {props.blocks.map(block => {
          return (
            <Block
              key={block.id}
              id={block.id}
              tag={block.tag}
              paired={block.paired}
              desc={block.desc}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BlocksCategory