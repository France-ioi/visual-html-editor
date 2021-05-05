import editorConfig from "../../../editorconfig"
import {produce} from "immer"
import {DropResult} from "react-beautiful-dnd";

// Define actions
export enum EditorActionsTypes {
  EditorElementMove = 'Editor.Element.Move',
}

// Type actions
type MoveElement = {
  type: typeof EditorActionsTypes.EditorElementMove
  payload: DropResult
}

// Action creators
export const moveElement = (elementId: DropResult): MoveElement => ({
  type: EditorActionsTypes.EditorElementMove,
  payload: elementId
})

// Reducers
type Actions = MoveElement

const initialState = {
  ...editorConfig,
}

const visualHTMLReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case EditorActionsTypes.EditorElementMove:
      return produce(state, draftState => {
        const draggedElement = action.payload.draggableId
        const source = action.payload.source
        const destination = action.payload.destination
        const foundElement = draftState.codeElements.find(e => e.id === draggedElement)
        if (source && destination && foundElement) {
          draftState.codeElements.splice(source.index, 1)
          draftState.codeElements.splice(destination.index, 0, foundElement)
          console.log('Updated!')
        } else {
          console.log('Not found!')
        }
      })
    default:
      return state
  }
}

export default visualHTMLReducer