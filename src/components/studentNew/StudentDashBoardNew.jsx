import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalYesNo } from '..';
import { DataTypeEnum, DEFAULT_PAGING, SortOrder } from '../../constants/constants.ts';
import { SPACE_UMMM_UDD_UYYYY } from '../../constants/DateFormatConst.ts';
import CustomPaging from '../common/paging/CustomPaging.component.tsx';
import CustomTable from '../common/table/CustomTable.component.tsx';
import { StudentSlice } from './Student.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileExcel, faFilePdf, faPrint, faCopy, faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import SearchCriteria from '../student/SearchCriteria';
import './StudentDashBoardNew.scss';

function StudentDashBoarNew(props) {
  const { editStudent, addNewStudent } = props;
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [columns, setColumns] = useState(initCols);
  const [isNoRecordFound, setNoRecordFound] = useState(false);

  function initCols() {
    return [
        {
            id: 'studentCode',
            header: 'Student Code',
            accessor: 'studentCode',
            minWidth: 80,
            sort: SortOrder.DEFAULT,
            icons: [<FontAwesomeIcon icon={faCaretRight}/>, <FontAwesomeIcon icon={faCaretDown}/>]
        },
        {
            id: 'firstName',
            header: 'Name',
            accessor: 'fullName',
            minWidth: 100,
            sort: SortOrder.DEFAULT
        },
        {
            id: 'className',
            header: 'Class',
            accessor: 'trainingClass.className',
            minWidth: 150,
            sort: SortOrder.DEFAULT
        },
        {
            id: 'dateOfBirth',
            header: 'Date Of Birth',
            accessor: 'dateOfBirth',
            dataType: DataTypeEnum.Date,
            format: SPACE_UMMM_UDD_UYYYY,
            minWidth: 100,
            sort: SortOrder.DEFAULT
        },
        {
            id: 'phoneNumber',
            header: 'Phone',
            accessor: 'phoneNumber',
            minWidth: 150,
            sort: SortOrder.DEFAULT
        },
        {
            id: 'address',
            header: 'Address',
            accessor: 'address',
            minWidth: 100,
            sort: SortOrder.DEFAULT
        }
    ]
}

  const ft = {
    totalRecords: 5,
    totalPages: 1,
    searchName: '',
    sortByCols: '',
    orderBy: '',
    pageNo : 1,
    recordsPerPage: 5
  };
  const [filter, setFilter] = useState(ft);
  
  const { students, page } = useSelector(state => state.studentsNew);

  const dispatch = useDispatch();
  const {actions} = StudentSlice;
  
  useEffect(() => {
   dispatch(actions.getStudents(filter));
  },[filter]);

  useEffect(() => {
    setNoRecordFound(students.length === 0);
}, [students]);

  function onPageChange(f) {
    setFilter(f);
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

  function deleteAStudent(student) {
    setShowModal(true);
    setStudentToDelete(student);
  }

  async function handleDeleteStudent() {
   // deleteStudent(studentToDelete);
    alert(`Deleted student ${studentToDelete.fullName} successfully!`)
      setFilter({
        ...filter,
        number: 0
      });
  }

  const onSortChange = (f) => {
    setFilter({...f, pageNo: DEFAULT_PAGING.START_PAGE})
}

  const renderTable = () => {
    return (
        <CustomTable
            className={'-striped tb-data-change'}
            columns={columns}
            data={students}
            groupBy='studentCode'
            filter={filter}
            noRecordMessage="No records found"
            onSortChange={onSortChange}
        />
    )
}

const renderAction = () => {
  return (
      <div className="action">
              <button type="button" className="btn btn-light" disabled={isNoRecordFound}>
                  <FontAwesomeIcon icon={faFileExcel} size="lg"/> Export Excel
              </button>

              <button type="button" className="btn btn-light" disabled={isNoRecordFound}>
                  <FontAwesomeIcon icon={faFilePdf} size="lg"/> Export PDF
              </button>
        
              <button type="button" className="btn btn-light" onClick={copyToClipboard} placeholder='coppied!' disabled={isNoRecordFound}>
                  <FontAwesomeIcon icon={faCopy} size="lg"/> Copy
              </button>
          
              <button type="button" className="btn btn-light last" onClick={print} disabled={isNoRecordFound}>
                  <FontAwesomeIcon icon={faPrint} size="lg"/> Print
              </button> 
      </div>
  )
}

const copyToClipboard = (event) => {
  event.preventDefault();
  //setInitCopyComponent(true);
  //setChangeCopyTrigger(hasChangeCopyTrigger + 1);
}

const print = () => { 
//  setPrint(true);
 // setChangePrintTrigger(hasChangePrintTrigger + 1);
}

return (
  <div >
    <h1 className="dash-board">Dash Board</h1>
    <SearchCriteria onSubmit={handleFilterChange} />
    {renderAction()}
    {renderTable()}
    <CustomPaging filter={filter} onChange={onPageChange} totalPages={page.totalPages} totalRecords={page.totalElements}/>
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

export default StudentDashBoarNew;