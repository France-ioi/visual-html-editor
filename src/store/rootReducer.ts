import blocksCategoryReducer from "./features/blocks/blocks"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
  blocksCategoryReducer: blocksCategoryReducer
})

export default rootReducer