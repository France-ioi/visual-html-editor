import editorConfig from "../../../editorconfig"
import {produce} from "immer"
import {DropResult} from "react-beautiful-dnd";

// Define actions
export enum EditorActionsTypes {
  EditorElementMove = 'Editor.Element.Move',
  EditorElementDelete = 'Editor.Element.Delete'
}

// Type actions
type MoveElement = {
  type: typeof EditorActionsTypes.EditorElementMove
  payload: DropResult
}

type DeleteElement = {
  type: typeof EditorActionsTypes.EditorElementDelete
  payload: DropResult
}

// Action creators
export const moveElement = (elementId: DropResult): MoveElement => ({
  type: EditorActionsTypes.EditorElementMove,
  payload: elementId
})

export const deleteElement = (elementId: DropResult): DeleteElement => ({
  type: EditorActionsTypes.EditorElementDelete,
  payload: elementId
})

// Reducers
type Actions = MoveElement | DeleteElement

const initialState = {
  ...editorConfig,
}

const visualHTMLReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case EditorActionsTypes.EditorElementMove:
      return produce(state, draftState => {
        const draggedElementId = action.payload.draggableId
        const source = action.payload.source
        const destination = action.payload.destination
        const foundElement = draftState.codeElements.find(e => e.id === draggedElementId)
        if (source && destination && foundElement) {
          // If element dropped at higher index AND on a different line, set modifier to 1
          const modifier = (destination.index > source.index && destination.droppableId !== source.droppableId) ? 1 : 0
          // Insert element at destination index - modifier while removing element at source index
          draftState.codeElements.splice(
            destination.index - modifier, 0, draftState.codeElements.splice(source.index, 1)[0]
          )
        } else {
          console.log('Not found!')
        }
      })
    case EditorActionsTypes.EditorElementDelete:
      return produce(state, draftState => {
        draftState.codeElements.splice(action.payload.source.index, 1)
      })
    default:
      return state
  }
}

export default visualHTMLReducer