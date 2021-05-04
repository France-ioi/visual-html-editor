import editorConfig from "../../../editorconfig"
import {produce} from "immer"

// Define actions

// Type actions

// Action creators

// Reducers
type Actions = 'Yes' | 'No'

const initialState = {
  ...editorConfig,
}

const visualHTMLReducer = (state = initialState, action: Actions) => {
  switch (action) {
    case 'Yes':
      console.log('wow')
      return state
    default:
      return state
  }
}

export default visualHTMLReducer