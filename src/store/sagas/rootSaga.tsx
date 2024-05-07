import { takeEvery, put } from "redux-saga/effects";
import { setUser, setBooks } from "../reducers/rootReducer";

function* workGetUser({ payload }: any) {
  yield put(setUser(payload));
  return;
}

function* workGetBooks({ payload }: any) {
    yield put(setBooks(payload));
    return;
  }

export default function* rootSaga() {
  yield takeEvery("GET_USER", workGetUser);
  yield takeEvery("GET_BOOKS", workGetBooks);
}
