import {createStore, applyMiddleware} from "redux"
import createSagaMiddleWare from 'redux-saga'
import rootSaga from "../sagas"
import rootReducer from "./rootReducer"

const sagaMiddleware = createSagaMiddleWare()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // Remove on production

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store