import React, { useState, useRef } from 'react';
import '../components/ColorBox/ColorBox.scss';

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

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            onSubmit(valueTemp);
        }, 400);  
    }

    return (
        <div>
            Search criteria:
            <form>
                <input type="text" value={searchValue} onChange={handleSearchValueOnChange}>
                </input>
            </form>
        </div>
    );

}

export default SearchCriteria;
