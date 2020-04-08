import React, { useState, useRef } from 'react';
import '../components/ColorBox/ColorBox.scss';

function DeleteStudent(props) {
    const [searchValue, setSearchValue] = useState('');
    const { onSubmit } = props;

    function handleCloseModal() {

    }

    function handleDeleteFromModal() {

    }

    return (
        <div>
            {(
                <ModalYesNo
                    message={`Would you like to delete ?`}
                    onNo={handleCloseModal}
                    onYes={handleDeleteFromModal}
                />
            )}
        </div>
    );

}

export default DeleteStudent;
