import {all, call, put, takeEvery} from 'redux-saga/effects';
import { loadStudentsApi } from './student.api';
import { getStudents, getStudentsSuccess, getStudentsError } from './Student.slice';

export function* getStudentsAsync(param) {
    try {
        const data = yield call(loadStudentsApi, param.payload);
        yield put(getStudentsSuccess(data));
    } catch (err) {
        yield put(getStudentsError());
    }
}

export function* GetStudentsSaga() {
    yield all([
        yield takeEvery(getStudents, getStudentsAsync),
    ]);
}
