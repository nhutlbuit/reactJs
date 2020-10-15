import React from "react";
import PropTypes from "prop-types";

const CustomCellGroupIcon = (props: any) => {
    const {column, isRoot, isExpanded} = props

    return (
        <>
            {!isRoot && <span className="ct-no-icon"/>}
            {isRoot && <span className="ct-icon-left">{!isExpanded ? column.icons[0] : column.icons[1]}</span>}
        </>
    )
}

CustomCellGroupIcon.propTypes = {
    column: PropTypes.any,
    isRoot: PropTypes.bool,
    isExpanded: PropTypes.bool,

}

export default CustomCellGroupIcon