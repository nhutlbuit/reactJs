import React from "react";
import PropTypes from "prop-types";

const CustomCellLink = (props: any) => {
    const {href, data, column, onClick, defaultText} = props

    const handleClick = (e: any, data: any) => {
        onClick(e, data)
    }

    function displayText() {
        return data[column.accessor] || defaultText
    }

    return (
        <a href={href} onClick={(e) => handleClick(e, data)}>{displayText()}</a>
    )
}

CustomCellLink.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    data: PropTypes.any,
    column: PropTypes.any,
    defaultText: PropTypes.string
}

export default CustomCellLink