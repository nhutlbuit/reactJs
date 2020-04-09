import React, { useState, useRef } from 'react';

function SearchCriteria(props) {
    const [searchValue, setSearchValue] = useState('');
    const { onSubmit } = props;
    // created object, value is not change beetween render times
    const typingTimeOutRef = useRef(null);

    function handleSearchValueOnChange(e) {
        const valueTemp = e.target.value;
        setSearchValue(e.target.value);
        if (!onSubmit) {
            return;
        }

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            onSubmit(valueTemp);
        }, 400);
    }

    function clearSearchValue() {
        onSubmit('');
        setSearchValue('');
    }

    return (
        <div>
            <div className="bold-text">Search criteria:</div>
            <form>
                <input className="text-box" type="text" value={searchValue} onChange={handleSearchValueOnChange}>
                </input>
                <button className="use-icon" onClick={clearSearchValue}>
                    <i className="fas fa-times"/>
                </button>
            </form>
        </div>
    );

}

export default SearchCriteria;
