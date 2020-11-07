import { put, takeEvery, call } from 'redux-saga/effects';
import { setUser, setErrors, clearErrors } from './actions';
import { login, fetchUser, logout } from './fetch';

function* loginSaga(action) {
  const { response, error } = yield call(() => login(action.payload));

  if (response) {
    yield put(setUser(response))
    yield put(clearErrors());
  } else {
    yield put(setErrors(error))
  }
}

function* fetchUserSaga() {
  const user = yield call(() => fetchUser());
  yield put(setUser(user));
}

function* logoutSaga() {
  yield call(() => logout());
  yield put(setUser());
}

export default function* rootSaga() {
  yield takeEvery('FETCH_USER', fetchUserSaga);
  yield takeEvery('LOGIN', loginSaga);
  yield takeEvery('LOGOUT', logoutSaga);
}

