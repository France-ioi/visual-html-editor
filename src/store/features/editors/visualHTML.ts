import editorConfig from "../../../editorconfig"
import {produce} from "immer"
import {DropResult} from "react-beautiful-dnd"
import {CodeSegment, TagType} from "../../../editorconfig"
import {v4 as uuidv4} from "uuid"

// Define actions
export enum EditorActionsTypes {
  EditorElementMove = 'Editor.Element.Move',
  EditorElementDelete = 'Editor.Element.Delete',
  EditorElementCreate = 'Editor.Element.Create'
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

type CreateElement = {
  type: typeof EditorActionsTypes.EditorElementCreate
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

export const createElement = (elementId: DropResult): CreateElement => ({
  type: EditorActionsTypes.EditorElementCreate,
  payload: elementId
})

// Reducers
type Actions = MoveElement | DeleteElement | CreateElement

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
    case EditorActionsTypes.EditorElementCreate:
      return produce(state, draftState => {
        const elementTagType = action.payload.draggableId.split("-")
        const elementToCreate: CodeSegment = {
          id: uuidv4(),
          type: elementTagType[1] === 'opening' ? TagType.Opening : TagType.Closing,
          value: elementTagType[0],
          unlocked: true
        }
        if (action.payload.destination) {
          draftState.codeElements.splice(action.payload.destination.index, 0, elementToCreate)
        }
      })
    default:
      return state
  }
}

export default visualHTMLReducer