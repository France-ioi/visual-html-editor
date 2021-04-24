import blocksCategoryReducer from "./features/blocks/blocksCategory"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
  blocksCategoryReducer: blocksCategoryReducer
})

export default rootReducer