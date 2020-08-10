import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchCriteria from './SearchCriteria';
import { ModalYesNo } from '..';
import axios from 'axios';
import useStudents from './useStudents';


function StudentDashBoard(props) {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const page = {
    number: 0,
    totalElements: 5,
    size: 5,
    totalPages: 1,
    searchName: ''
  };
  const [filter, setFilter] = useState(page);
  const [pagination, setPagination] = useState(page);

  const { editStudent, addNewStudent } = props;
  
  const {
    getStudents,
    studentList,
    selectedStudent
  } = useStudents();

  useEffect(() => {
    const response = getStudents(filter);
    console.log(JSON.stringify(studentList));
    console.log(JSON.stringify(selectedStudent));
  }, [getStudents, filter]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const url = `/trainingApi/students/search/likeName?name=${filter.searchName}&page=${filter.number}&size=${filter.size}&projection=InlineStudent`;
        const response = await fetch(url);
        const responseJson = await response.json();
        setStudents(responseJson._embedded.students);
        setPagination(responseJson.page);
      } catch (error) {
        console.log('Failed to fetch data');
      }
    }
    fetchStudents();
  }, [filter]);

  function handlePageChange(newPageNumber) {
    setFilter({
      ...filter,
      number: newPageNumber
    })
  }

  function handlePageSizeChange(newPagesize) {
    setFilter({
      ...filter,
      size: newPagesize,
      number: 0
    })
  }

  function handleFilterChange(name) {
    if (name === filter.searchName) return;
    setFilter({
      ...filter,
      searchName: name,
      number: 0
    })
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDeleteFromModal() {
    handleCloseModal();
    handleDeleteStudent();
  }

  function deleteStudent(student) {
    setShowModal(true);
    setStudentToDelete(student);
  }

  async function handleDeleteStudent() {
    try {
      const url = `/trainingApi/students/${studentToDelete.id}`;
      const response = await axios.delete(url);
      if (response.status === 204) {
        alert(`Deleted student ${studentToDelete.fullName} successfully!`)
        setFilter({
          ...filter,
          number: 0
        });
      }
    } catch (error) {
      console.log(`Failed to delete student ${studentToDelete.fullName}`);
    }
  }

  return (
    <div >
      <h1 className="dash-board">Dash Board</h1>
      <SearchCriteria onSubmit={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th>Student Code</th>
            <th>Name</th>
            <th>Class</th>
            <th>Date Of Birth</th>
            <th>Phone</th>
            <th>Address</th>
            <th>
              <button className="use-icon" onClick={() => { {addNewStudent()} }}>
                <i className="fas fa-plus" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map(st => (
            <tr key={st.studentCode} >
              <td>{st.studentCode}</td>
              <td> {st.fullName}</td>
              <td> {st.trainingClass ? st.trainingClass.className : ''}</td>
              <td>{st.dateOfBirth}</td>
              <td>{st.phoneNumber}</td>
              <td>{st.address}</td>
              <td>
                <button onClick={() => deleteStudent(st)} className="use-icon-delete">
                  <i className="fas fa-trash" />
                </button>
                <button className="use-icon" onClick={() => {editStudent(st)}}>
                  <i className="fas fa-edit" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
      {showModal && (
        <ModalYesNo
          message={`Would you like to delete ${studentToDelete.fullName}?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}

    </div>
  );
}

export default StudentDashBoard;