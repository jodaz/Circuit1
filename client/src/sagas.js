import { put, takeEvery, call } from 'redux-saga/effects';
import { setUser, setErrors } from './actions';
import { login, fetchUser, logout } from './fetch';

function* loginSaga(action) {
  try {
    const res = yield call(() => login(action.payload));
    if (res.status >= 200 && res.status <= 300) {
      yield put(setUser(res));
    } else {
      console.log(res);
      throw res;
    }
  } catch (error) {
    yield put(setErrors(error));
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

