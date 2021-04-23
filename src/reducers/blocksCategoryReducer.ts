import {TOGGLE_CATEGORY} from "../actions/actionTypes"

interface CategoryState {
  toggled: boolean
}

const initialCategoryState: CategoryState = {
  toggled: false
}

type Action = {
  type: "TOGGLE_CATEGORY"
}

const blocksCategoryReducer = (state: CategoryState = initialCategoryState, action: Action) => {
  switch (action.type) {
    case TOGGLE_CATEGORY:
      return {...state, toggled: true}
    default:
      return state
  }
}

export default blocksCategoryReducer