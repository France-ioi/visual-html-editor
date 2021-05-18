import './BlocksToolbox.css'
import {ToolboxConfiguration} from "../../toolboxconfig"
import BlocksCategory from './BlocksCategory'
import {Droppable} from "react-beautiful-dnd";
import {useAppDispatch} from "../../hooks";
import {switchEditorMode} from "../../store/features/editors/HTMLEditors";

interface IBlocksToolbox {
  categories: ToolboxConfiguration,
  allowModeSwitch: boolean
}

function BlocksToolbox(props: IBlocksToolbox) {
  const dispatch = useAppDispatch()
  const editorSwitcher: JSX.Element = <>
    <input
      type={"checkbox"}
      id={'editor-mode-toggle'}
      onChange={() => dispatch(switchEditorMode())}
    />
    <label htmlFor={'editor-mode-toggle'}>Toggle Visual/Textual</label>
  </>

  return (
    <Droppable droppableId={'toolbox-dropzone'} isDropDisabled={false}>
      {provided => (
        <div
          className={'toolbox'}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.categories.categories.map(category => {
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
          {/* TODO Move input */}
          {props.allowModeSwitch ? editorSwitcher : ''}
        </div>
      )}
    </Droppable>
  )
}

export default BlocksToolbox