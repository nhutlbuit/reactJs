import React, { useState, useEffect } from 'react';
import '../components/ColorBox/ColorBox.scss';
import Pagination from './Pagination';
import SearchCriteria from './SearchCriteria';

function StudentDashBoard() {
  const [students, setStudents] = useState([]);
  const page = {
    number: 0,
    totalElements: 5,
    size: 5,
    totalPages: 1,
    searchName: ''
  };
  const [filter, setFilter] = useState(page);
  const [pagination, setPagination] = useState(page);

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
    setFilter({
      ...filter,
      searchName: name,
      number: 0
    })
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
              <button className="use-icon">
                <i className="fas fa-plus" />
              </button></th>
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
                <button className="use-icon">
                  <i className="fas fa-trash" />
                </button>
                <button className="use-icon">
                  <i className="fas fa-edit" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
    </div>
  );
}

export default StudentDashBoard;