import './BlocksToolbox.css'
import {ToolboxConfiguration} from "../../toolboxconfig"
import BlocksCategory from './BlocksCategory'

function BlocksToolbox({categories}: ToolboxConfiguration) {
  return (
    <div className={'toolbox'}>
      {categories.map(category => {
        return (
          <BlocksCategory
            key={category.id}
            name={category.name}
            blocks={category.blocks}
            highlight={category.highlight}
            id={category.id}
            toggled={category.toggled}
            maxHeight={category.maxHeight}
          />
        )
      })}
    </div>
  )
}

export default BlocksToolbox