import React, { useState } from 'react';

function TodoForm(props) {
    // alt+shift+o to remove abundant import;
    const [value, setValue] = useState('');
    const {onSubmit} = props;

    function handleSubmitForm(e) {
        e.preventDefault();
        if(!onSubmit){
            return;
        }
        const formValues = {
            title: value,
        }
        onSubmit(formValues);
        setValue('');
    };

    function handleOnChange(e) {
        setValue(e.target.value);
    }

    return (
        <form onSubmit= {handleSubmitForm}>
            <input type="text" value={value} onChange={handleOnChange}>
            </input>
        </form>
    );

}

export default TodoForm;
