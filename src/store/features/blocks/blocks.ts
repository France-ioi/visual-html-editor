import tbConf, {ToolboxConfiguration} from "../../../toolboxconfig"
import {produce} from 'immer'

// Define actions
export enum BlockActionsTypes {
  BlocksCategoryToggle = 'Blocks.Category.Toggle',
  BlocksBlockDescriptionToggle = 'Blocks.Block.Description.Toggle'
}

// Type actions
type ToggleCategory = {
  type: typeof BlockActionsTypes.BlocksCategoryToggle,
  payload: {
    category: number
  }
}

type ToggleBlockDescription = {
  type: typeof BlockActionsTypes.BlocksBlockDescriptionToggle,
  payload: {
    block: number
  }
}

// Action creators
export const toggleCategoryAction = (categoryId: number): ToggleCategory => ({
  type: BlockActionsTypes.BlocksCategoryToggle,
  payload: {
    category: categoryId
  }
})

export const toggleBlockDescriptionAction = (blockId: number): ToggleBlockDescription => ({
  type: BlockActionsTypes.BlocksBlockDescriptionToggle,
  payload: {
    block: blockId
  }
})

// Reducers
type Actions = ToggleCategory | ToggleBlockDescription

const blocksReducer = (state: ToolboxConfiguration = tbConf, action: Actions) => {
  switch (action.type) {
    case BlockActionsTypes.BlocksCategoryToggle:
      return produce(state, draftState => {
        const foundCategory = draftState.categories.find(c => c.id === action.payload.category)
        if (foundCategory) {
          foundCategory.toggled = !foundCategory.toggled
        }
      })
    case BlockActionsTypes.BlocksBlockDescriptionToggle:
      return produce(state, draftState => {
        const parentCategory = draftState.categories.find(c => c.blocks.find(b => b.id === action.payload.block))
        if (parentCategory) {
          parentCategory.blocks.forEach(b => {
            if (b.id === action.payload.block) {
              if (b.toggled) {
                parentCategory.openDesc = null
              } else {
                parentCategory.openDesc = action.payload.block
              }
              b.toggled = !b.toggled
            } else {
              b.toggled = false
            }
          })
        }
      })
    default:
      return state
  }
}

export default blocksReducer