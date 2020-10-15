import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataTypeEnum } from "../../../constants/constants";
import { customFormatTzYMD } from "../../../constants/utils/DateUtils";

const DefaultCell = (props: any) => {
    const {column, data} = props

    const [itemName, setItemName] = useState<any>();

    const getDataCell = () => {
        return getDepsProperties(data, column.accessor);
    }

    const getDepsProperties = (obj: any, accessor: String) => {  
        let key: any[] = accessor.split('.');
        let current = obj;
        while (key.length) {
            current = current[key.shift()]
        } 
        return current;
    }

    return (
        <span>{column.dataType === DataTypeEnum.Date ? customFormatTzYMD(getDataCell(), column.format) : getDataCell()} </span>
    )
}

DefaultCell.propTypes = {
    data: PropTypes.any,
    column: PropTypes.any
}

export default DefaultCell