import './BlocksToolbox.css'
import {ToolboxCategory, ToolboxConfiguration} from "../../toolboxconfig"
import BlocksCategory from './BlocksCategory'
import {Droppable} from "react-beautiful-dnd";

function BlocksToolbox({categories}: ToolboxConfiguration) {
  let previousIndex = 0
  let currIndex = previousIndex
  const makeCategoryWithPreviousIndex = (category: ToolboxCategory) => {
    currIndex = previousIndex
    previousIndex += category.blocks.filter(block => block.paired).length * 2 // Count paired blocks as 2 indexes
    previousIndex += category.blocks.filter(block => !block.paired).length
    return <BlocksCategory
      key={category.id}
      id={category.id}
      name={category.name}
      highlight={category.highlight}
      blocks={category.blocks}
      openDesc={category.openDesc}
      blocksIndexStart={currIndex}
    />

  }
  return (
    <Droppable droppableId={'toolbox-dropzone'} isDropDisabled={false}>
      {provided => (
        <div
          className={'toolbox'}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {categories.map(category => {
            return makeCategoryWithPreviousIndex(category)
          })}
        </div>
      )}
    </Droppable>
  )
}

export default BlocksToolbox