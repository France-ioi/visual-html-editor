import {createStore, applyMiddleware} from "redux"
import createSagaMiddleWare from 'redux-saga'
import rootSaga from "../sagas"
import rootReducer from "./rootReducer"

const sagaMiddleware = createSagaMiddleWare()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store