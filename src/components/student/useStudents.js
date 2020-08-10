import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentsAction, loadStudentsAction, deleteStudentAction, addStudentAction, updateStudentAction } from './student.actions';

/** Custom hook for accessing Student state in redux store */
function useStudents() {
  const dispatch = useDispatch();

  return {
    // Selectors
    studentList: useSelector(state => state.students.data),
    selectedStudent: useSelector(state => state.selectedStudent),

    // Dispatchers
    // Wrap any dispatcher that could be called within a useEffect() in a useCallback()
    addStudent: student => dispatch(addStudentAction(student)),
    deleteStudent: student => dispatch(deleteStudentAction(student)),
    getStudents: useCallback((filter) => dispatch(loadStudentsAction(filter)), [dispatch]), // called within a useEffect()
    selectStudent: student => dispatch(selectStudentsAction(student)),
    updateStudent: student => dispatch(updateStudentAction(student))
  };
}

export default useStudents;
