import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudentsAction, deleteStudentAction, addStudentAction, updateStudentAction } from './student.actions';

/** Custom hook for accessing Student state in redux store */
function useStudents() {
  const dispatch = useDispatch();

  return {
    // Selectors
  //   studentList1: useSelector(state => console.log(' state.students.updateError', state.students.updateError)),
    students: useSelector(state => state.students.data),
  //  selectedStudent: useSelector(state => state.selectedStudent),
    pagination: useSelector(state => state.students.page),
    getStudentsError: useSelector(state => state.students.error),
    updateStudentsError: useSelector(state => state.students.updateError),
    updateStudentsSuccess: useSelector(state => state.students.updateError),
    createStudentsError: useSelector(state => state.students.createError),
    

    // Dispatchers
    // Wrap any dispatcher that could be called within a useEffect() in a useCallback()
    addStudent: student => dispatch(addStudentAction(student)),
    deleteStudent: student => dispatch(deleteStudentAction(student)),
    getStudents: useCallback((filter) => dispatch(loadStudentsAction(filter)), [dispatch]), // called within a useEffect()
  //  selectStudent: student => dispatch(selectStudentsAction(student)),
    updateStudent: student => dispatch(updateStudentAction(student))
  };
}

export default useStudents;
