import tbConf, {ToolboxConfiguration} from "../../../toolboxconfig"
import {produce} from 'immer'

// Define actions
export enum ActionTypes {
  BlocksCategoryToggle = 'Blocks.Category.Toggle',
  BlocksBlockDescriptionToggle = 'Blocks.Block.Description.Toggle'
}

// Type actions
type ToggleCategory = {
  type: typeof ActionTypes.BlocksCategoryToggle,
  payload: {
    category: number
  }
}

type ToggleBlockDescription = {
  type: typeof ActionTypes.BlocksBlockDescriptionToggle,
  payload: {
    block: number
  }
}

// Action creators
export const toggleCategoryAction = (categoryId: number): ToggleCategory => ({
  type: ActionTypes.BlocksCategoryToggle,
  payload: {
    category: categoryId
  }
})

export const toggleBlockDescriptionAction = (blockId: number): ToggleBlockDescription => ({
  type: ActionTypes.BlocksBlockDescriptionToggle,
  payload: {
    block: blockId
  }
})

// Reducers
type Actions = ToggleCategory | ToggleBlockDescription

let calcHeight = true
const blocksReducer = (state: ToolboxConfiguration = tbConf, action: Actions) => {
  switch (action.type) {
    case ActionTypes.BlocksCategoryToggle:
      return produce(state, draftState => {
        const foundCategory = draftState.categories.find(c => c.id === action.payload.category)
        if (foundCategory) {
          foundCategory.toggled = !foundCategory.toggled
          // Set calcHeight
          if (foundCategory.openDesc) {
            calcHeight = false
          } else {
            calcHeight = true
          }
        }
      })
    case ActionTypes.BlocksBlockDescriptionToggle:
      return produce(state, draftState => {
        const parentCategory = draftState.categories.find(c => c.blocks.find(b => b.id === action.payload.block))
        if (parentCategory) {
          parentCategory.openDesc = action.payload.block
          parentCategory.blocks.forEach(b => {
            if (b.id === action.payload.block) {
              if (b.toggled) {
                parentCategory.openDesc = null
              }
              b.toggled = !b.toggled
            } else {
              b.toggled = false
            }
          })
          if (calcHeight) {
            calcHeight = false
          }
        }
      })
    default:
      return state
  }
}

export default blocksReducer