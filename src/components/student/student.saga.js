import { put, takeEvery, call, all } from 'redux-saga/effects';
import { loadStudentsApi, updateStudentApi, addStudentApi, deleteStudentApi } from './student.api';
import { LOAD_STUDENT_SUCCESS, LOAD_STUDENT_ERROR, LOAD_STUDENT, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_ERROR, ADD_STUDENT, ADD_STUDENT_SUCCESS,
  ADD_STUDENT_ERROR, DELETE_STUDENT_ERROR, DELETE_STUDENT_SUCCESS, DELETE_STUDENT, UPDATE_STUDENT, LOAD_STUDENT_PAGING } from './student.actions';

// Our worker Saga: will perform the async increment task
export function* loadingStudentsAsync({payload}) {
 
  try {
    const data = yield call(loadStudentsApi, payload);
    const students = [...data._embedded.students];
    const paging = { page : data.page };
    yield put({ type: LOAD_STUDENT_SUCCESS, payload: students });
    yield put({ type : LOAD_STUDENT_PAGING, payload: paging })
  } catch (err) {
    yield put({ type: LOAD_STUDENT_ERROR, payload: err.message });
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadingStudentsAsync() {
  yield takeEvery(LOAD_STUDENT, loadingStudentsAsync);
}

export function* updatingStudentAsync({ payload }) {
  try {
    const data = yield call(updateStudentApi, payload);
    const updatedStudent = data;

    yield put({ type: UPDATE_STUDENT_SUCCESS, payload: updatedStudent });
  } catch (err) {
    yield put({ type: UPDATE_STUDENT_ERROR, payload: err.message });
  }
}

export function* watchUpdatingStudentAsync() {
  yield takeEvery(UPDATE_STUDENT, updatingStudentAsync);
}

export function* deletingStudentAsync({ payload }) {
  try {
    yield call(deleteStudentApi, payload);

    yield put({ type: DELETE_STUDENT_SUCCESS, payload: null });
  } catch (err) {
    yield put({ type: DELETE_STUDENT_ERROR, payload: err.message });
  }
}

export function* watchDeletingStudentAsync() {
  yield takeEvery(DELETE_STUDENT, deletingStudentAsync);
}

export function* addingStudentAsync({ payload }) {
  try {
    const data = yield call(addStudentApi, payload);
    const addedStudent = data;

    yield put({ type: ADD_STUDENT_SUCCESS, payload: addedStudent });
  } catch (err) {
    yield put({ type: ADD_STUDENT_ERROR, payload: err.message });
  }
}

export function* watchAddingStudentAsync() {
  yield takeEvery(ADD_STUDENT, addingStudentAsync);
}

export function* studentSaga() {
  yield all([
    watchLoadingStudentsAsync(),
    watchUpdatingStudentAsync(),
    watchDeletingStudentAsync(),
    watchAddingStudentAsync()
  ]);
}
