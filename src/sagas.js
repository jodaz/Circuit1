import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { clearCommons, updateVotes, setUser, setErrors, clearErrors, loading } from './actions';
import { login, fetchUser, logout } from './fetch';
import { setAuthToken, history } from './utils';

function* loginSaga(action) {
  yield put(loading());
  const { response, error } = yield call(() => login(action.payload));

  if (response) {
    const { token, user } = response;

    if (user.role === 'USER') {
      yield put(updateVotes(user.votationCenter.dispatches));
    }

    yield put(setUser(user))
    yield put(clearErrors());
    setAuthToken(token);
    history.push('/home');
  } else {
    yield put(setErrors(error))
  }
  yield put(loading());
}

function* fetchUserSaga(action) {
  const { response, error } = yield call(() => fetchUser(action.payload));

  if (response) {
    yield put(setUser(response));

    if (response.role === 'USER') {
      yield put(updateVotes(response.votationCenter.dispatches));
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
  yield put(clearErrors());
  yield put(clearCommons());
  setAuthToken();
  history.push('/login');
}

function* updateVotesSaga(action) {
  let votes = 0;

  if (action.payload) {
    votes = action.payload.reduce((total, item) => {
      return total + item.votes;
    }, 0);
  }

  yield put({
    type: 'UPDATE_COMMONS',
    payload: {
      votes: votes
    }
  });
}

export default function* rootSaga() {
  yield takeEvery('FETCH_USER', fetchUserSaga);
  yield takeLatest('UPDATE_VOTES', updateVotesSaga);
  yield takeEvery('LOGIN', loginSaga);
  yield takeEvery('LOGOUT', logoutSaga);
}

