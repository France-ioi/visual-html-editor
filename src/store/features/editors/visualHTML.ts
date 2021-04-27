import editorConfig, {visualHTMLEditor} from "../../../editorconfig"
import {produce} from "immer"

// Define actions

// Type actions

// Action creators

// Reducers
type Actions = 'Yes' | 'No'

const visualHTMLReducer = (state: visualHTMLEditor = editorConfig, action: Actions) => {
  switch (action) {
    case 'Yes':
      console.log('wow')
      return state
    default:
      return state
  }
}

export default visualHTMLReducer