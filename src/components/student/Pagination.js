import React from 'react';
import Select from 'react-select'

function Pagination(props) {
    const { pagination, onPageChange, onPageSizeChange } = props;
    const options = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
    ];

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }

    function onChangePageSize(newPageSize) {
        if (onPageSizeChange){
            onPageSizeChange(newPageSize.value);
        }
    }

    return (
        <div>
            <Select options={options} onChange={onChangePageSize} className="select" defaultValue={options[0]}/>
            <button className="btn-paginate" disabled={pagination.number === 0} onClick={() => handlePageChange(0)}>First</button>
            <button className="btn-paginate" disabled={pagination.number === 0} onClick={() => handlePageChange(pagination.number - 1)}>Previous</button>
            <button className="btn-paginate" disabled={pagination.number === pagination.totalPages - 1} onClick={() => handlePageChange(pagination.number + 1)}>Next</button>
            <button className="btn-paginate" disabled={pagination.number === pagination.totalPages - 1} onClick={() => handlePageChange(pagination.totalPages - 1)}>Last</button>
        </div>
    );

}

export default Pagination;
