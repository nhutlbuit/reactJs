import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function StudentDetail(props) {

  const history = useHistory();
  const { student } = props;
  const [st, setSt] = useState(Object.assign({}));
  const [isCreate, setIsCreate] = useState();
  const [classCodeList, setClassCodeList] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [dob, setDob] = useState(new Date());

  useEffect(() => {
    fetchClassCodeList();
  }, []);

  useEffect(() => {
    const isCreate = (student === undefined || student === null);
    setSt(isCreate? {} : student);
    setIsCreate(isCreate);
    setSelectedClass(classCodeList[0]);
    if (!isCreate) {
      setDob(new Date(student.dateOfBirth));
      const classCodeSelect = classCodeList.find(e => e.value === student.trainingClass.classCode);
      setSelectedClass(classCodeSelect);
    }
  }, [classCodeList]);

  async function fetchClassCodeList() {
    try {
      const url = `/trainingApi/trainingClasses/search/fetchClassCodes?projection=InlineTrainingClassGetIdOnly`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (response.status === 200) {
        const options = responseJson['_embedded'].trainingClasses;
        const classCodes = options.map(e => {
            const list = {};
            list['label'] = e.className;
            list['value']  = e.classCode;
            return list;
        });
        setClassCodeList(classCodes);
      }
    } catch (error) {
      alert(`Get list class code error!`);
    }
  }

  function handleStudentChange(e) {
    setSt({...st, [e.target.name]: e.target.value});
  }

  async function createStudent(stu) {
    try {
      const url = `/trainingApi/students`;
      const response = await Axios.post(url, stu);
      if (response.status === 201) {
        alert('Save Successfully!');
        history.push('/student');
      }
    } catch (error) {
      alert(`Failed to save student ${stu.firstName}`);
    }
  }

  async function updatedStudent(stu) {
    const data = {};
    data['id'] = stu.id;
    data['classCode'] = stu.classCode;
    data['dateOfBirth'] = stu.dateOfBirth;
    data['firstName'] = stu.firstName;
    data['lastName'] = stu.lastName;
    data['middleName'] = stu.middleName;
    data['phoneNumber'] = stu.phoneNumber;
    data['studentCode'] = stu.studentCode;
    data['address'] = stu.address;

    try {
      const url = `/trainingApi/students/${data.id}`;
      const response = await Axios.patch(url, data);
      if (response.status === 200) {
        alert('Save Successfully!');
        history.push('/student');
      }
    } catch (error) {
      alert(`Failed to save student ${stu.firstName}`);
    }
  }

  function save(e) {
    if (isCreate) {
      createStudent(e);
    } else {
      updatedStudent(e);
    }
  }

  function cancel() {
    history.push('/student');
  }

  function onChangeClassCode(e) {
    setSt({...st, 'classCode': e.value});
  }

  function handleDateOfBirthChange(date) {
    setDob(date);
    setSt({...st, 'dateOfBirth': date});
  }

  return (
    <div>
       <h1 className="dash-board">{student ? 'Edit Student' : 'Add New Student' }</h1>
       <div className="field">

          <label className="label" htmlFor="stCode">Student Code</label>
          <input name = "studentCode" className="input" type="text" defaultValue={st?.studentCode} placeholder= 'Student Code' onChange={handleStudentChange} />
          
          <label className="label" htmlFor="stCode">First Name</label>
          <input name = "firstName" className="input" type="text" defaultValue={st?.firstName}  placeholder= 'First Name' onChange={handleStudentChange} />
          
          <label className="label" htmlFor="stCode">Middle Name</label>
          <input name = "middleName" className="input" type="text" defaultValue={st?.middleName}  placeholder= 'Middle Name' onChange={handleStudentChange} />
          
          <label className="label" htmlFor="stCode">Last Name</label>
          <input name = "lastName" className="input" type="text" defaultValue={st?.lastName}  placeholder= 'Last Name' onChange={handleStudentChange} />
          
          <label className="label" htmlFor="stCode">Phone Number</label>
          <input name = "phoneNumber" className="input" type="text" defaultValue={st?.phoneNumber}  placeholder= 'Phone Number' onChange={handleStudentChange} />
          
          <label className="label" htmlFor="classCode">Class</label>
          <Select options={classCodeList} onChange={onChangeClassCode} className="selectClassCode" value={selectedClass}/>
      
          <label className="label" htmlFor="dateOfBirth">Date Of Birth</label>
          <DatePicker selected={dob} onChange={handleDateOfBirthChange} />

          <label className="label" htmlFor="stCode">Address</label>
          <input name = "address" className="input" type="text" defaultValue={st?.address}  placeholder= 'Address' onChange={handleStudentChange} /> 
    </div>
    <button name ="save" onClick={() => save(st)}>Save</button>
    &nbsp;
    <button name ="cancel" onClick={() => cancel()}>Cancel</button>
    </div>
  );
}

export default StudentDetail;