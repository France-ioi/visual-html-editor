import './BlocksCategory.css'
import {ToolboxCategory, ToolboxCategoryBlocks} from "../../toolboxconfig"
import Block from "./Block"
import {useEffect, useRef, useState} from "react"

function BlocksCategory(props: ToolboxCategory) {
  const [open, setOpen] = useState(false)
  const categoryBlocksRef = useRef<HTMLDivElement>(null)

  let previousBlockIndex = props.blocksIndexStart
  const makeBlockWithPreviousIndex = (block: ToolboxCategoryBlocks) => {
    let currIndex = previousBlockIndex
    previousBlockIndex! += block.paired ? 2 : 1
    console.log('Block ' + block.id + ' indexes: ' + currIndex)
    return (
      <Block
        key={block.id}
        id={block.id}
        index={currIndex}
        tag={block.tag}
        paired={block.paired}
        desc={block.desc}
      />
    )
  }

  // TODO Change behavior and fix height inconsistencies
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
          return makeBlockWithPreviousIndex(block)
        })}
      </div>
    </div>
  )
}

export default BlocksCategory