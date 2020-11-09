import { put, takeEvery, call } from 'redux-saga/effects';
import { setUser, setErrors, clearErrors } from './actions';
import { login, fetchUser, logout } from './fetch';
import { setAuthToken, history } from './utils';

function* loginSaga(action) {
  const { response, error } = yield call(() => login(action.payload));

  if (response) {
    const { token, user } = response;
    yield put(setUser(user))
    yield put(clearErrors());
    setAuthToken(token);
    history.push('/home');
  } else {
    yield put(setErrors(error))
  }
}

function* fetchUserSaga(action) {
  const user = yield call(() => fetchUser(action.payload));
  yield put(setUser(user));
}

function* logoutSaga() {
  yield call(() => logout());
  yield put(setUser());
  setAuthToken();
  history.push('/login');
}

export default function* rootSaga() {
  yield takeEvery('FETCH_USER', fetchUserSaga);
  yield takeEvery('LOGIN', loginSaga);
  yield takeEvery('LOGOUT', logoutSaga);
}

