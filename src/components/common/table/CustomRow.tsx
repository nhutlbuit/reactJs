import React, {useEffect, useState} from "react";
import {Column, Row} from "./CustomTableCore";
import CustomCellGroupIcon from "./CustomCellGroupIcon";
import DefaultCell from "./DefaultCell";
import PropTypes from "prop-types";

const CustomRow = (props: any) => {
    const {className, onRowClick} = props
    const [row, setRow] = useState(props.row);
    const [columns] = useState<Array<Column>>(props.columns);

    useEffect(() => {
        setRow(props.row)
    }, [props.row])

    const onClick = (row: Row) => {
        row.isRoot && onRowClick()
        row.expanded = row.isRoot && !row.expanded
        setRow({...row})
    }

    return (
        <div className={'ct-tr ' + (row.isRoot ? 'ct-row-root ' : '') + className}
             onClick={() => row.isRoot && onClick(props.row)}>
            {
                columns.map((c: Column, index) => (
                    <div key={index} className={'ct-td '}
                         style={{flex: c.minWidth + ' 0 auto', width: c.minWidth}}>
                        <div className={'align-middle'}>
                            {c.icons && <CustomCellGroupIcon isRoot={row.isRoot} column={c} isExpanded={row.expanded}/>}
                            {!c.cell && <DefaultCell column={c} data={row.item}/>}
                            {!!c.cell && React.cloneElement(c.cell, {column: c, data: row.item})}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

CustomRow.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array,
    row: PropTypes.any,
    onRowClick: PropTypes.func
}

export default CustomRow