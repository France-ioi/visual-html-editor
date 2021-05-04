import editorConfig, {InitialEditorState} from "../../../editorconfig"
import {produce} from "immer"

// Define actions

// Type actions

// Action creators

// Reducers
type Actions = 'Yes' | 'No'

const initialState = {
  ...editorConfig,
  lines: [
    {
      id: 1,
      lineNumber: 1,
      indent: 0,
      elementIds: ['body']
    },
    {
      id: 2,
      lineNumber: 2,
      indent: 1,
      elementIds: ['div']
    },
    {
      id: 3,
      lineNumber: 3,
      indent: 3,
      elementIds: ['h1', 'Example Domain']
    },
  ]
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