import tbConf, {ToolboxConfiguration} from "../../../toolboxconfig"
import {produce} from 'immer'

// TODO Define action types
enum CategoryAction {
  ToggleCategory = 'category/toggle'
}

// TODO Define actions
export const toggleCategoryAction = (categoryId: Number) => ({
  type: CategoryAction.ToggleCategory,
  payload: categoryId
})

// TODO Define reducers
type Action = {
  type: CategoryAction.ToggleCategory,
  payload: Number
}

const blocksCategoryReducer = (state: ToolboxConfiguration = tbConf, action: Action) => {
  switch (action.type) {
    case "category/toggle":
      return produce(state, draftState => {
        const foundCategory = draftState.categories.find(c => c.id === action.payload)
        if (foundCategory) foundCategory.toggled = !foundCategory.toggled
      })
    default:
      return state
  }
}

export default blocksCategoryReducer