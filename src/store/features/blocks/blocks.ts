import tbConf, {ToolboxConfiguration} from "../../../toolboxconfig"
import {produce} from 'immer'

// Define actions
export enum BlockActionsTypes {
  BlocksBlockDescriptionToggle = 'Blocks.Block.Description.Toggle'
}

// Type actions
type ToggleBlockDescription = {
  type: BlockActionsTypes.BlocksBlockDescriptionToggle,
  payload: {
    block: number
  }
}

// Action creators
export const toggleBlockDescriptionAction = (blockId: number): ToggleBlockDescription => ({
  type: BlockActionsTypes.BlocksBlockDescriptionToggle,
  payload: {
    block: blockId
  }
})

// Reducers
type Actions = ToggleBlockDescription

const blocksReducer = (state: ToolboxConfiguration = tbConf, action: Actions) => {
  switch (action.type) {
    case BlockActionsTypes.BlocksBlockDescriptionToggle:
      return produce(state, draftState => {
        const parentCategory = draftState.categories.find(c => c.blocks.find(b => b.id === action.payload.block))
        if (parentCategory) {
          parentCategory.openDesc = parentCategory.openDesc === action.payload.block ? null : action.payload.block
        }
      })
    default:
      return state
  }
}

export default blocksReducer