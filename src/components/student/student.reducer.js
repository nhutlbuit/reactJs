import { LOAD_STUDENT, ADD_STUDENT_ERROR, ADD_STUDENT_SUCCESS, ADD_STUDENT, DELETE_STUDENT_SUCCESS, DELETE_STUDENT, UPDATE_STUDENT_ERROR, 
  UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT, LOAD_STUDENT_ERROR, LOAD_STUDENT_SUCCESS, SELECT_STUDENT, DELETE_STUDENT_ERROR } from './student.actions';

let initState = {
  loading: false,
  data: [],
  error: void 0
};

export const studentsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_STUDENT:
      return { ...state, loading: false, error: ''};
    case LOAD_STUDENT_SUCCESS:
      return { ...state, loading: false, data: [...action.payload] };
    case LOAD_STUDENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_STUDENT:
      return {
        ...state,
        data: state.data.map(h => {
          if (h.id === action.payload.id) {
            state.loading = true;
          }
          return h;
        })
      };
    case UPDATE_STUDENT_SUCCESS:
      return modifyStudentState(state, action.payload);
    case UPDATE_STUDENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_STUDENT: {
      return {
        ...state,
        loading: true,
        data: state.data.filter(h => h !== action.payload)
      };
    }

    case DELETE_STUDENT_SUCCESS: {
      const result = { ...state, loading: false };
      return result;
    }

    case DELETE_STUDENT_ERROR: {
      return {
        ...state,
        data: [...state.data, action.payload.requestData],
        loading: false
      };
    }

    case ADD_STUDENT: {
      return { ...state, loading: true };
    }

    case ADD_STUDENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, { ...action.payload }]
      };
    }

    case ADD_STUDENT_ERROR: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

const modifyStudentState = (studentState, studentChanges) => {
  return {
    ...studentState,
    loading: false,
    data: studentState.data.map(h => {
      if (h.id === studentChanges.id) {
        return { ...h, ...studentChanges };
      } else {
        return h;
      }
    })
  };
};

let initialSelectedStudent = null;

export const selectedStudentReducer = (state = initialSelectedStudent, action) => {
  switch (action.type) {
    case SELECT_STUDENT:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
};
