import './BlocksToolbox.css'
import {ToolboxConfiguration} from "../../toolboxconfig"
import BlocksCategory from './BlocksCategory'
import {Droppable} from "react-beautiful-dnd";

function BlocksToolbox({categories}: ToolboxConfiguration) {
  return (
    <Droppable droppableId={'toolbox-dropzone'}>
      {provided => (
        <div
          className={'toolbox'}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {categories.map(category => {
            return (
              <BlocksCategory
                key={category.id}
                id={category.id}
                name={category.name}
                highlight={category.highlight}
                blocks={category.blocks}
                openDesc={category.openDesc}
              />
            )
          })}
        </div>
      )}
    </Droppable>
  )
}

export default BlocksToolbox