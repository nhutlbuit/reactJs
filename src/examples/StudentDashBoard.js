import React, { useState, useEffect } from 'react';
import '../components/ColorBox/ColorBox.scss';

function StudentDashBoard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const url = `/trainingApi/students/search/likeName?name=&page=0&size=&projection=InlineStudent`;
        const response = await fetch(url);
        const responseJson = await response.json();
        setStudents(responseJson._embedded.students);
      } catch (error) {
        console.log('Failed to fetch data')
      }
    }
    fetchStudents();
  }, []);

  return (
    <div >
      <table>
        <thead>
          <tr>
            <th colspan="5">Student Code</th>
            <th colspan="3">Name</th>
            <th>Class</th>
            <th>Date Of Birth</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(st => (
            <tr key={st.studentCode} >
              <td colspan="5">{st.studentCode}</td>
              <td colspan="3"> {st.fullName}</td>
              <td> {st.trainingClass ? st.trainingClass.className : ''}</td>
              <td>{st.dateOfBirth}</td>
              <td>{st.dateOfBirth}</td>
              <td>{st.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashBoard;