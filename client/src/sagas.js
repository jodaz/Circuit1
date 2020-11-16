import { put, takeEvery, fork, take, call, takeLatest } from 'redux-saga/effects';
import { updateVotes, setUser, setErrors, clearErrors } from './actions';
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
  const { response, error } = yield call(() => fetchUser(action.payload));

  if (response) {
    yield put(setUser(response));

    if (response.role === 'USER') {
      yield put(updateVotes(response.votationCenter.votes));
    }

    yield put(clearErrors());
  } else {
    setAuthToken();
    yield put(setErrors(error));
    history.push('/login');
  }
}

function* logoutSaga() {
  yield call(() => logout());
  yield put(setUser());
  setAuthToken();
  history.push('/login');
}

function* updateVotesSaga(action) {
  yield put({
    type: 'UPDATE_COMMONS',
    payload: {
      votes: action.payload
    }
  });
}

export default function* rootSaga() {
  yield takeEvery('FETCH_USER', fetchUserSaga);
  yield takeLatest('UPDATE_VOTES', updateVotesSaga);
  yield takeEvery('LOGIN', loginSaga);
  yield takeEvery('LOGOUT', logoutSaga);
}

