import tbConf, {ToolboxConfiguration} from "../../../toolboxconfig"
import {produce} from 'immer'
import {MutableRefObject} from "react";

// Define actions
const TOGGLE_CATEGORY = 'category/toggle'

// Type actions
type ToggleCategory = {
  type: typeof TOGGLE_CATEGORY,
  payload: {
    category: Number,
    blocksDivRef: MutableRefObject<any>
  }
}

// Action creators
export const toggleCategoryAction = (categoryId: Number, categoryRef: MutableRefObject<any>): ToggleCategory => ({
  type: TOGGLE_CATEGORY,
  payload: {
    category: categoryId,
    blocksDivRef: categoryRef
  }
})

// Reducers
type Actions = ToggleCategory

const blocksReducer = (state: ToolboxConfiguration = tbConf, action: Actions) => {
  switch (action.type) {
    case 'category/toggle':
      // Calculate total height of all child block components for accordion animation
      let maxHeight = 0;
      (action.payload.blocksDivRef.current.childNodes as NodeListOf<HTMLDivElement>).forEach((block: HTMLDivElement) => {
        maxHeight += block.clientHeight
      })
      // Update state
      return produce(state, draftState => {
        const foundCategory = draftState.categories.find(c => c.id === action.payload.category)
        if (foundCategory) {
          foundCategory.toggled = !foundCategory.toggled
          foundCategory.toggled ? foundCategory.maxHeight = maxHeight : foundCategory.maxHeight = 0
        }
      })
    // case "category/toggleDescription":
    //   return state
    default:
      return state
  }
}

export default blocksReducer