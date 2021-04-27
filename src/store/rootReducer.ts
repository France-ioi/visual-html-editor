import blocksReducer from "./features/blocks/blocks"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
  blocksReducer: blocksReducer
})

export default rootReducer