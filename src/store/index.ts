import {createStore, applyMiddleware} from "redux"
import createSagaMiddleWare from 'redux-saga'
import rootSaga from "../sagas"
import rootReducer from "../reducers"

const sagaMiddleware = createSagaMiddleWare()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store