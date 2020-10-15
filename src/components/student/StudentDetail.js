import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useStudents from './useStudents';
import Button from 'react-bootstrap/Button';

function StudentDetail(props) {

  const history = useHistory();
  const { student } = props;
  const [st, setSt] = useState(Object.assign({}));
  const [isCreate, setIsCreate] = useState();
  const [classCodeList, setClassCodeList] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [dob, setDob] = useState(new Date());
  const { updateStudent, addStudent, updateStudentsError, createStudentsError } = useStudents();

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

  async function createStudent(stu) {
  /*  try {
      const url = `/trainingApi/students`;
      const response = await Axios.post(url, stu);
      if (response.status === 201) {
        alert('Save Successfully!');
        history.push('/student');
      }
    } catch (error) {
      alert(`Failed to save student ${stu.firstName}`);
    }
*/
    await addStudent(stu);
    if (createStudentsError) {
      alert('Save error!');
    } else {
      alert('Save Successfully!');
      history.push('/student');
    }
  }


  async function updatedStudent(stu) {
    const data = {};
    data['id'] = stu.id;
    data['classCode'] = stu.classCode ? stu.classCode: stu?.trainingClass?.classCode;
    data['dateOfBirth'] = stu.dateOfBirth;
    data['firstName'] = stu.firstName;
    data['lastName'] = stu.lastName;
    data['middleName'] = stu.middleName;
    data['phoneNumber'] = stu.phoneNumber;
    data['studentCode'] = stu.studentCode;
    data['address'] = stu.address;

    // try {
    //   const url = `/trainingApi/students/${data.id}`;
    //   const response = await Axios.patch(url, data);
    //   if (response.status === 200) {
    //     alert('Save Successfully!');
    //     history.push('/student');
    //   }
    // } catch (error) {
    //   alert(`Failed to save student ${stu.firstName}`);
    // }
    await updateStudent(data);
    if (updateStudentsError) {
      alert('Save error!');
    } else {
      alert('Save Successfully!');
      history.push('/student');
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

  function handleStudentChange(e) {
    setSt({...st, [e.target.name]: e.target.value});
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
    <Button variant="success" name ="save" onClick={() => save(st)}>Save</Button >
    &nbsp;
    <Button variant="secondary" name ="cancel" onClick={() => cancel()}>Cancel</Button>
    </div>
  );
}

export default StudentDetail;