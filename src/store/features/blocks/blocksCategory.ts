// TODO Define action types
enum CategoryAction {
  ToggleCategory = 'category/toggle'
}

// TODO Define actions
export const toggleCategoryAction = () => ({
  type: CategoryAction.ToggleCategory
})

// TODO Define reducers
interface CategoryState {
  toggled: boolean
}

const initialCategoryState: CategoryState = {
  toggled: false
}

type Action = {
  type: CategoryAction.ToggleCategory
}

const blocksCategoryReducer = (state: CategoryState = initialCategoryState, action: Action) => {
  switch (action.type) {
    case "category/toggle":
      return {
        ...state,
        toggled: !state.toggled
      }
    default:
      return state
  }
}

export default blocksCategoryReducer