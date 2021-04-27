// TODO Watchers and workers then combine into rootSaga
import {put, takeEvery, all} from 'redux-saga/effects'

export default function* rootSaga() {
  console.log('Hello saga')
}