import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    students: [],
    loading: false,
    error: '',
    page: {}
};

export const StudentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getStudents: (state, payloadAction) => {
            state.loading = true;
            state.error = '';
        },
        getStudentsSuccess: (state, payloadAction) => {
            state.students = payloadAction.payload._embedded.students;
            state.page = payloadAction.payload.page;
            state.loading = false;
            state.error = '';
        },
        getStudentsError: (state) => {
            state.error = 'failed';
            toast.error("Fetch data student failed. Please contact admin!");
        },
        
    }
});

export const {
    getStudents,
    getStudentsSuccess,
    getStudentsError,

} = StudentSlice.actions;

export default StudentSlice.reducer;