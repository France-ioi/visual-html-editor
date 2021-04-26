import tbConf, {ToolboxConfiguration} from "../../../toolboxconfig"
import {produce} from 'immer'
import {MutableRefObject} from "react";

// TODO Define action types
enum CategoryAction {
  ToggleCategory = 'category/toggle'
}

// TODO Define actions
export const toggleCategoryAction = (categoryId: Number, categoryRef: MutableRefObject<any>) => ({
  type: CategoryAction.ToggleCategory,
  payload: {
    category: categoryId,
    blocksDivRef: categoryRef
  }
})

// TODO Define reducers
type Payload = {
  category: Number,
  blocksDivRef: MutableRefObject<any>
}

type Action = {
  type: CategoryAction.ToggleCategory,
  payload: Payload
}

const blocksCategoryReducer = (state: ToolboxConfiguration = tbConf, action: Action) => {
  switch (action.type) {
    case "category/toggle":
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
    default:
      return state
  }
}

export default blocksCategoryReducer