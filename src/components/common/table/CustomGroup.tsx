import React, {useEffect, useState} from "react";
import {Column, Group, Row} from "./CustomTableCore";
import CustomRow from "./CustomRow";
import PropTypes from "prop-types";

const CustomGroup = (props: any) => {
    const {className} = props
    const [group, setGroup] = useState<Group>(props.group);
    const [columns] = useState<Array<Column>>(props.columns);

    useEffect(() => {
        setGroup(props.group)
    }, [props.group])

    const onRootClick = () => {
        group.expanded = !group.expanded
        setGroup({...group})
    }

    return (
        <div className={'ct-tr-group ' + (group.expanded ? 'ct-expanded ' : '') + className}>
            {
                group.rows.map((r: Row, index) => (
                    <CustomRow key={index} row={r} columns={columns} className={index % 2 != 0 ? '-even' : '-odd'}
                               onRowClick={onRootClick}/>
                ))
            }
        </div>
    )
}

CustomGroup.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array,
    group: PropTypes.any,
}

export default CustomGroup