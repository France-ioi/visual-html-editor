import blocksCategoryReducer from "./blocksCategoryReducer"
import {combineReducers} from "redux"

const rootReducer = combineReducers({
  blocksCategoryReducer: blocksCategoryReducer
})

export default rootReducer