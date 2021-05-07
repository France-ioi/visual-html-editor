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
            id={category.id}
            name={category.name}
            highlight={category.highlight}
            blocks={category.blocks}
            openDesc={category.openDesc}
          />
        )
      })}
    </div>
  )
}

export default BlocksToolbox