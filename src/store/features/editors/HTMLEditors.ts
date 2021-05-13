import editorConfig, {EditorType} from "../../../editorconfig"
import {produce} from "immer"
import {DropResult} from "react-beautiful-dnd"
import {CodeSegment, TagType} from "../../../editorconfig"
import {v4 as uuidv4} from "uuid"

// Define actions
export enum EditorActionsTypes {
  VisualEditorElementMove = 'Editor.Element.Move',
  VisualEditorElementDelete = 'Editor.Element.Delete',
  VisualEditorElementCreate = 'Editor.Element.Create',
  TextualEditorUpdateCode = 'Editor.Textual.Update'
}

// Type actions
type MoveElement = {
  type: typeof EditorActionsTypes.VisualEditorElementMove
  payload: DropResult
}

type DeleteElement = {
  type: typeof EditorActionsTypes.VisualEditorElementDelete
  payload: DropResult
}

type CreateElement = {
  type: typeof EditorActionsTypes.VisualEditorElementCreate
  payload: DropResult
}

type UpdateTextual = {
  type: typeof EditorActionsTypes.TextualEditorUpdateCode
  payload: string
}

// Action creators
export const moveElement = (elementId: DropResult): MoveElement => ({
  type: EditorActionsTypes.VisualEditorElementMove,
  payload: elementId
})

export const deleteElement = (elementId: DropResult): DeleteElement => ({
  type: EditorActionsTypes.VisualEditorElementDelete,
  payload: elementId
})

export const createElement = (elementId: DropResult): CreateElement => ({
  type: EditorActionsTypes.VisualEditorElementCreate,
  payload: elementId
})

export const updateTextual = (code: string): UpdateTextual => ({
  type: EditorActionsTypes.TextualEditorUpdateCode,
  payload: code
})

// Reducers
type Actions = MoveElement | DeleteElement | CreateElement | UpdateTextual

const initialState = {
  ...editorConfig,
}

const visualHTMLReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case EditorActionsTypes.VisualEditorElementMove:
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
    case EditorActionsTypes.VisualEditorElementDelete:
      return produce(state, draftState => {
        draftState.codeElements.splice(action.payload.source.index, 1)
      })
    case EditorActionsTypes.VisualEditorElementCreate:
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
    case EditorActionsTypes.TextualEditorUpdateCode:
      return produce(state, draftState => {
        draftState.codeString = action.payload
      })
    default:
      return state
  }
}

export default visualHTMLReducer