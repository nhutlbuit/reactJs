import React from "react";
import './CustomPaging.component.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faChevronLeft, faChevronRight, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const CustomPaging = (props: any) => {
    const {filter, totalRecords, totalPages, onChange} = props
    library.add(faStepBackward, faStepForward, faChevronLeft, faChevronRight)

    const changePage = (e: any) => {
        filter.pageNo = e.target.value
        validatePageNo()
        onChange({...filter})
    }
    const validatePageNo = () => {
        filter.pageNo = filter.pageNo > totalPages ? totalPages : filter.pageNo
        filter.pageNo = filter.pageNo < 1 ? 1 : filter.pageNo
    }
    const changePageSize = (e: any) => {
        filter.recordsPerPage = e.target.value
        filter.pageNo = 1
        onChange({...filter})
    }
    const goNextPage = () => {
        filter.pageNo = hasNext() ?  filter.pageNo + 1 : filter.pageNo
        onChange({...filter})
    }
    const goPrevPage = () => {
        filter.pageNo = hasPrev() ? filter.pageNo - 1 : filter.pageNo
        onChange({...filter})
    }
    const stepBackward = () => {
        filter.pageNo = 1
        onChange({...filter})
    }
    const stepForward = () => {
        filter.pageNo = totalPages
        onChange({...filter})
    }
    const hasNext = () => {
        return filter.pageNo < totalPages
    }
    const hasPrev = () => {
        return filter.pageNo > 1
    }
    const getFirstOffsetDisplay = () => {
        return 1 + (filter.pageNo - 1) * filter.recordsPerPage
    }
    const getLatestOffsetDisplay = () => {
        let latest = filter.pageNo * filter.recordsPerPage
        return latest < totalRecords ? latest : totalRecords
    }
    return (
        <div className="ct-paging d-flex align-items-center justify-content-start">
            <div className="d-flex align-items-center justify-content-center pl-2">
                <span onClick={stepBackward} className={hasPrev() ? 'cursor-pointer' : 'text-muted'}>
                    <FontAwesomeIcon icon={faStepBackward}/></span>
            </div>
            <div className="d-flex align-items-center justify-content-center pl-2">
                <span onClick={hasPrev && goPrevPage} className={hasPrev() ? 'cursor-pointer' : 'text-muted'}>
                    <FontAwesomeIcon icon={faChevronLeft}/></span>
            </div>
            <div className="d-flex align-items-center justify-content-center pl-2">
                <span>Page</span>
                <input id="current_page_no" className="current_page_no ml-2" pattern="[0-9]*"
                       name="pageNo" type="number" value={filter.pageNo} max={totalPages} min={1} onChange={changePage}/>
                <span className="pl-2">of</span><span className="pl-2">{totalPages}</span>
            </div>
            <div className="d-flex align-items-center justify-content-center pl-2">
                <span onClick={hasNext && goNextPage} className={hasNext() ? 'cursor-pointer' : 'text-muted'}>
                    <FontAwesomeIcon icon={faChevronRight}/></span>
            </div>
            <div className="d-flex align-items-center justify-content-center pl-2">
                <span onClick={stepForward} className={hasNext() ? 'cursor-pointer' : 'text-muted'}>
                    <FontAwesomeIcon icon={faStepForward}/></span>
            </div>
            <div className="d-flex align-items-center justify-content-center pl-2">
                <select className="page_size" value={filter.recordsPerPage}
                        disabled={!totalRecords || totalRecords <= 0} onChange={changePageSize}>
                    {
                        [5, 10, 15, 20, 30, 50, 100, 200].map(option => (
                                <option key={option}>{option}</option>
                            )
                        )
                    }
                </select>
            </div>
            <div className="no-records-text pl-3">
                Displaying {getFirstOffsetDisplay()} to {getLatestOffsetDisplay()} of  {totalRecords} items
            </div>
        </div>
    )
}

CustomPaging.propTypes = {
    onChange: PropTypes.func,
    filter: PropTypes.any,
    totalRecords: PropTypes.number,
    totalPages: PropTypes.number
}

export default CustomPaging