import blocksReducer from "./features/blocks/blocks"
import visualHTMLReducer from "./features/editors/HTMLEditors"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
  blocksReducer: blocksReducer,
  visualHTMLReducer: visualHTMLReducer
})

export default rootReducer